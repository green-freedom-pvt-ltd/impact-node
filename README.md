
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

### API query format
For getting a run 


    http://localhost:3000/v2/runs/

For getting a run of a particular user 


    http://localhost:3000/v2/runs/?user_id_id=79


For getting flagged run of a particular user 


    http://localhost:3000/v2/runs/?user_id_id=79&is_flag=true


For getting flagged run of first 100 users


    http://localhost:3000/v2/runs/?user_id_id.lte=100&is_flag=true