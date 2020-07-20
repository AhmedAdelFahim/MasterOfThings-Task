FROM node:12


# Create app directory
WORKDIR /app

#COPY package*.json ./
COPY . /app


RUN npm install
RUN sh redis-server-installation.sh
RUN npm run build-client


EXPOSE 5000

#Deploying App With redis
CMD ["sh", "-c", "redis-server > /dev/null 2>&1 & node  index.js"]
