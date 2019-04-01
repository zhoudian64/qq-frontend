FROM nginx:1.15.10-alpine
COPY ./dist /usr/share/nginx/html/
COPY config.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","yarn"]
EXPOSE 80
