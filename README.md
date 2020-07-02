# MasterOfThings-Task
## Installation

1.  Install  **Nodejs** 
2.  Install  **npm** 
3.  Install  **MySQLDB**
4.  Install  **Redis Server**
5.  Clone the Project
6.  Run Redis Server
7.  Run mysql service
8.  then run these commands     
    ```
    cd MasterOfThings-Task
    npm install
    cp .env.example .env
    cp config/config.json.example config/config.json
    ```
    write your db credentials, db name, node environment and session secret in .env & config.json then:
    ```
    npx sequelize-cli db:create 'dbName'
    npx sequelize-cli db:migrate
    npm start
    
    cd client/
    npm install
    cp .env.example .env
    npm start
    ```
9. For testing set node environment with "test"
   ```
   npx sequelize-cli db:create 'testing dbName' --env=test
   npx sequelize-cli db:migrate --env=test
   npm test
   ```
