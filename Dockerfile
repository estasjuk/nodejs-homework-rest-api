FROM node:18.16.0

WORKDIR /node-app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "bin/server"]