const express = require('express');
const db = require('./db');

db.connect();


const app=express();


app.get('/', (req, res) => res.send("Welcome to Node Postgres Express POC !!"))

app.get('/causes', (req, res, next) => db.getCauses((err, causes) => {
	if(err){
		return next(err);
	};
}));




const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('listening on port '+ port));