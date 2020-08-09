FROM node:14-alpine3.12

RUN apk update && apk add git openssh

RUN git config --global user.email "aiji42@gmail.com"
RUN git config --global user.name "Aiji Uejima"
RUN npm install -g create-next-app

