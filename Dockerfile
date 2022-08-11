FROM node:18-bullseye

WORKDIR /usr/app
COPY . .

CMD ["npm", "start"]
