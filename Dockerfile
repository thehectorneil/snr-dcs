FROM node:lts-alpine as clientbuild
RUN apk update
RUN apk add git

WORKDIR /app
COPY . .

RUN npm install
RUN npm install -g @quasar/cli
RUN quasar build

FROM flashspys/nginx-static
RUN apk update && apk upgrade
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=clientbuild /app/dist/spa /static


