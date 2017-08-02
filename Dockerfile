FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json config.js compilr.js server.js ./
COPY dist ./dist/

RUN npm install

EXPOSE 13570

CMD [ "npm", "start" ]
