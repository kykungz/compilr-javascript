FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.lock server.js ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
