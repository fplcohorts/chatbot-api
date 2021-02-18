var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
app.use(express.static('public'));
app.use(bodyParser.json());
const User = require('./model/user');


var currentUser = new User(); 
module.exports = currentUser;
var port = process.env.PORT || 81;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);


app.use('/api', require('./routes/api'));



app.listen(port);
console.log('Magic happens on port ' + port);