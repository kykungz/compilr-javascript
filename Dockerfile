FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json server.js ./

RUN npm install

EXPOSE 13570

CMD [ "npm", "start" ]
