# FROM node:20
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci 
USER node
# CMD npm start
# CMD ["npm", "start"]
EXPOSE 3000
CMD ["npm", "start", "--","--host"]
