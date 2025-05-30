FROM node:24

WORKDIR /usr/src/src
COPY ./src .
COPY ./package*.json ./

RUN yarn install