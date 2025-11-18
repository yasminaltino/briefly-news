FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --include=dev

COPY . .

ENV PATH="/usr/src/app/node_modules/.bin:$PATH"

EXPOSE 3000

CMD ["npm", "run", "start:dev"]alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --include=dev && npm install -g @nestjs/cli

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]