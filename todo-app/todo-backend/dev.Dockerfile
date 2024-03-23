FROM node:20
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm install
USER node
CMD ["npm", "run", "dev", "--", "--host"]
EXPOSE 3000

# FROM node:20
# WORKDIR /usr/src/app
# COPY --chown=node:node . .
# RUN npm ci 
# USER node
# CMD npm start


# FROM node:20
# WORKDIR /usr/src/app
# COPY . .
# # Change npm ci to npm install since we are going to be in development mode
# RUN npm install
# ENV VITE_BACKEND_URL="//localhost:3000"
# # npm start is the command to start the application in development mode
# CMD ["npm", "run", "dev", "--", "--host"]
