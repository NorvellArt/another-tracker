FROM node:alpine AS builder

WORKDIR /app

COPY ./client/package.json ./client/package-lock.json ./

RUN ["npm", "i"]

COPY ./client .

RUN ["npm", "run", "build"]

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]