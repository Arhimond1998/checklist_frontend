# bookworm images are more secure compared to alpine
FROM node:24-bookworm-slim as build

ENV NODE_ENV=production 

WORKDIR /app

COPY package.json ./

RUN npm install vite
RUN npm i
COPY . ./

RUN npm run build

FROM node:24-bookworm-slim

WORKDIR /app
COPY --from=build /app .

EXPOSE 3000

CMD ["node","build"]