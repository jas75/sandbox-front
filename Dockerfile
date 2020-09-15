
FROM node:10 as node

WORKDIR /sandbox-front

COPY package*.json /sandbox-front/

RUN npm install

COPY . /sandbox-front

#RUN npm run build:prod
RUN npm run build:prod

FROM nginx:1.16.0-alpine

COPY --from=node  /sandbox-front/dist/angular-ngrx-material-starter /usr/share/nginx/html
COPY --from=node /sandbox-front/nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'