FROM node:14.16.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin;$PATH

COPY package.json ./
RUN yarn 
RUN yarn add --dev typescript

COPY . ./

CMD ["yarn","build"]
CMD ["yarn","start"]
