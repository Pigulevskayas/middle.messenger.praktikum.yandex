FROM node:latest
WORKDIR var/www
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
CMD node server.js
EXPOSE 3000
