FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
ADD . /app

EXPOSE 8080

RUN rm -f .npmrc

CMD [ "npm run start:dev" ]
ENTRYPOINT [ "sh", "-c" ]