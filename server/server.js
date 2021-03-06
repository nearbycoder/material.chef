var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var settings = require('./config');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var bcrypt = require('bcryptjs');
var port = 9090;
var mongoose = require('mongoose');
var User = require('./models/user');
var api = express.Router();
var router = express.Router();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(settings.db); // connect to our database


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

api.route('/')
	.get(function(req, res) {
		res.json({ authorized: true });
});

app.use('/api', api	);



router.use(function(req, res, next) {
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
      var token = jwt.sign({email : user.email}, settings.secret, {
        expiresInMinutes: 1440 // expires in 24 hours
      });

      if (err) {throw err}

      if(!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

	      // check if password matches
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else if(bcrypt.compareSync(req.body.password, user.password)) {

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
router.route('/signup')
	.post(function(req, res) {
		// find the user
      User.findOne({
        email: req.body.email
      }, function(err, user) {

      var emailfilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
      var passwordfilter = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
      var salt = bcrypt.genSaltSync(10);

      var newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
      })

      if (err){throw err}

      if (user) {
        res.json({ success: false, message: 'User already exists!' });
      } else if (!user) {


				if(!emailfilter.test(req.body.email)){
					return res.json({ success: false, message: 'email not valid!' });
				}
				if(!passwordfilter.test(req.body.password)){
					return res.json({ success: false, message: 'password not strong enough!' });
				}


	    	newUser.save(function(error) {
          var token = jwt.sign({email : req.body.email}, settings.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });

	    		if(error){throw error}

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
	    	})
      }
    });
	});
app.use('/', router);

server.listen(port);
console.log('Magic happens on port ' + port);
