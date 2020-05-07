FROM keymetrics/pm2:latest-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm install && npm install -g express && npm install -g nodemon
#RUN npm install pm2 -g
#CMD pm2 start npm -- start
CMD ["pm2-runtime", "start", "./bin/www", "nodemon"]
EXPOSE 3000
