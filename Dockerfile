FROM node:12
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./



RUN npm install

#ENV SESSION_SECRET asdasdasdasda
#ENV DB_NAME regisration
#ENV DB_USERNAME ahmed
#ENV DB_PASSWORD ANONY@2@mous
#ENV DB_HOST 127.0.0.1
#ENV CLIENT_PORT 3000
# Bundle app source
COPY . .
RUN sh redis-server-installation.sh
#RUN redis-server &
#RUN npm run build-client


EXPOSE 5000

#Deploying App With redis
CMD ["sh", "-c", "redis-server > /dev/null 2>&1 & node index.js"]
#CMD [ "node", "index.js" ]
