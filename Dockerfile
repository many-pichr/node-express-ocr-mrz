FROM node:18-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]