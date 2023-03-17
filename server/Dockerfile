FROM node:18.14.0 as server

WORKDIR /server
COPY ./package.json ./yarn.lock ./
RUN  yarn install

COPY ./ ./

CMD ["yarn", "start:dev"]