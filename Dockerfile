FROM node:18.4.0
WORKDIR /app
COPY . .

ENV DOCKERIZE_VERSION v0.6.1

RUN apt-get update && \ 
    apt-get install -y wget


RUN npm install

ENV REACT_APP_URL_BASE='https://kanongamingapi.marioaugusto.com.br/'

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

ENTRYPOINT ["npm","start"]