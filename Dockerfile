FROM node:lts-alpine

COPY . /app
WORKDIR /app/packages/app

RUN \
    apk update && \
    apk add rsync

CMD ["yarn", "start"]
