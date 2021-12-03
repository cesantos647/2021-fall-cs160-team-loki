FROM node:16-alpine

WORKDIR /2021-fall-cs160-team-loki

COPY package*.json ./

RUN npm install

COPY ../ .

EXPOSE 3000

CMD [ "npm", "run", "start"]