
# node-postgres-express-sequalize

This project consists a Proof of Concept for a scalable backend node application.

####  To get started -

    git clone https://github.com/dhope21/node-postgres.git
    cd node-postgres
    npm install
    
####  You can set up config files with environment specific data 

    export NODE_ENV=prod

####  You can run Jest for verifing your test cases by using 

    npm test

 
### **Tech Stack**
- Node
- Express
- PostgreSQL
- Express
- Lumber
- Loadash
- Grunt
- Sequelize
- New Relic
- Jest
- Winston logger


### Routing
Base url


    http://localhost:3000/

API Versions


    http://localhost:3000/v0/

Platform


    http://localhost:3000/v0/app/


Model


    http://localhost:3000/v0/app/runs/

### Authentication
The authentication is handled inside a middleware. 
There can are separate authentication for every platform based on its usage.
The authorization is provided in the headers 

    GET /v0/app/runs/ HTTP/1.1
    Host: localhost:3000
    Content-Type: application/x-www-form-urlencoded
    Authorization: Bearer 6719a46895a4s26d24f27e38d9d1e8633125454e
    Cache-Control: no-cache



### API query format
For getting a run 


    http://localhost:3000/v0/ced/runs/

For getting a run of a particular user 


    http://localhost:3000/v0/ced/runs/?user_id_id=79


For getting flagged run of a particular user 


    http://localhost:3000/v0/ced/runs/?user_id_id=79&is_flag=true


For getting flagged run of first 100 users


    http://localhost:3000/v0/ced/runs/?user_id_id.lte=100&is_flag=true