const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authroutes');
const dotenv = require('dotenv');
const { requireAuth, checkUser } = require('./middleware/authmiddleware');
const app = express();
dotenv.config();
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
// Bringing in the functionalities of the json rendering.
app.use(express.json());

// Using the plug in for cookie parsing
app.use(cookieParser());
app.set('view engine', 'ejs');
const uri = process.env.uri
const startserver = async ()=>{
    await mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true, family:4});
    console.log('Connected to the database')
    app.listen(3002, ()=>{console.log('Server running')});

}
startserver();
app.get('*',checkUser);
app.get('/cart',requireAuth);
app.get('/',(req, res)=>res.render('home'));
app.use(authRoutes);
    