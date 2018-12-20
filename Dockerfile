FROM node:10-alpine

WORKDIR /server-calculator

COPY package.json yarn.lock ./

RUN yarn

COPY serv-deco.js ./

EXPOSE 3000

CMD ["yarn", "start"]
