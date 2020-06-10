const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex')
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
  client: 'pg',
  connection: {
  	  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }

  }
});



const app= express();

app.use(express.json());
 app.use(cors());


app.get('/', (req, res) => {
	res.send('all working');
})


app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id',(req, res) => {profile.handleProfile(req, res, db)})
 
app.put('/image',(req, res) => {image.handleImage(req,res,db)})

app.post('/imageurl',(req, res) => {image.handleApiCall(req,res,db)})

// Load hash from your password DB.



app.listen(process.env.PORT ||3000, ()=>{
	console.log(`app is running port ${process.env.PORT}`)
})


