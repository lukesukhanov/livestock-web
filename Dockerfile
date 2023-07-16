FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY ./dist $WORKDIR
EXPOSE 80/tcp