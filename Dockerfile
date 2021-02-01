ARG domain

FROM node:14-alpine
RUN mkdir /app
WORKDIR /app

EXPOSE 8080
EXPOSE 3306

COPY package*.json /app/
COPY .npmrc /app/

RUN npm install --production
RUN rm -f .npmrc

COPY dist /app/

CMD [ "npm run start:${domain}" ]
ENTRYPOINT [ "sh", "-c" ]
