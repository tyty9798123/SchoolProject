FROM keymetrics/pm2:latest-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
#RUN npm install pm2 -g
#CMD pm2 start npm -- start
CMD ["pm2-runtime", "start", "./bin/www"]
EXPOSE 3000