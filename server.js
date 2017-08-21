var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:password@ds023523.mlab.com:23523/ecommerce91', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('connected to the database');
    }
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/create-user', (req, res, next) => {
    var user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err) {
        if(err) return next(err);
        res.json('Successfully created a new user');
    });
});

app.get('/', (req, res) => {
    res.render('main/home');
});

app.get('/about', (req, res) => {
    res.render('main/about');
});

app.listen(3000, function(err) {
    if(err) throw err;
    console.log('Server is running on port 3000');
});