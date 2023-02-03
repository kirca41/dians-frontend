FROM node:17-alpine3.15 AS builder

# Set working directory
WORKDIR /frontend

# COPY package.json package-lock.json .
COPY package*.json ./

RUN npm install

# Copy all files from current directory to working dir in image
COPY . .

EXPOSE 3000

CMD ["npm","start"]
