var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var server = require('http').createServer(app);
var settings = require('./config');
var jwt    = require('jsonwebtoken');
var cors = require('cors');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 9090; // set our port

var mongoose = require('mongoose');
mongoose.connect(settings.db); // connect to our database
var User = require('./models/user');

// create our router
var router = express.Router();

var api = express.Router();
api.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, settings.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});


// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET /api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/login')
	.post(function(req, res) {
		// find the user
	  User.findOne({
	    email: req.body.email
	  }, function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {

	      // check if password matches
	      if (user.password != req.body.password) {
	        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({email : user.email}, settings.secret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});


app.use('/', router);

server.listen(port);
console.log('Magic happens on port ' + port);