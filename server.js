const express = require('express');
const db = require('./db/index');

db.connect();


const app=express();


app.get('/', (req, res) => res.send("Welcome to Node Postgres Express POC !!"))

app.get('/causes', (req, res, next) => db.getCauses((causes, err) => {
	if(causes){
		return next(causes);
	};
}));





const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('listening on port '+ port));