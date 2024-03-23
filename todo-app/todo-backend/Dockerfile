FROM node:20.5.1-bookworm-slim
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci 
USER node
EXPOSE 3000
CMD ["npm", "start", "--","--host"]
