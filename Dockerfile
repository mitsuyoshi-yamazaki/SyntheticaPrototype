FROM node:24

WORKDIR /usr/src/app
COPY ./app .
COPY ./package*.json ./

RUN yarn install