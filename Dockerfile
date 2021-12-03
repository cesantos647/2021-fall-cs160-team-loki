FROM node:16-alpine

WORKDIR /2021-fall-cs160-team-loki

COPY package*.json ./

RUN npm install

COPY ../ .

EXPOSE 5000

CMD [ "npm", "run", "start"]