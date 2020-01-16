const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex');

const register = require('./controller/register');
const signIn = require('./controller/signIn');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => { res.send('It is working.')});
app.get('/profile/:id', profile.handleProfileGet(db));
app.post('/signin',  signIn.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt, saltRounds));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)} );



