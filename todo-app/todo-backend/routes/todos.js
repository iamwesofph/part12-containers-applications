const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis/index");

router.get("/statistics", async (req, res) => {
    const added = await getAsync("added_todos");
    if (isNaN(added)) {
        setAsync("added_todos", 0);
    }
    res.send(added);
});

router.post("/", async (req, res) => {
    const added = parseInt(await getAsync("added_todos"));
    setAsync("added_todos", added + 1);
    const todo = await Todo.create({
        text: req.body.text,
        done: false,
    });
    res.send(todo);
});

router.get("/", async (_, res) => {
    const todos = await Todo.find({});
    res.send(todos);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
    const { id } = req.params;
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.sendStatus(404);

    next();
};

singleRouter.delete("/", async (req, res) => {
    await req.todo.delete();
    res.sendStatus(200);
});

singleRouter.get("/", async (req, res) => {
    res.send(req.todo);
});

singleRouter.put("/", async (req, res) => {
    const { text, done } = req.body;
    const { todo } = req;

    todo.text = text;
    todo.done = done;

    await todo.save();

    res.send(todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
