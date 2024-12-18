FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json/ ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]