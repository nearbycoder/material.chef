var alt = require("../alt");
var UserActions = require("../actions/UserActions");
var config = require("../configs/config.js");
var request = require("superagent");
class UserStore {
	constructor() {
		this.userLoggedIn = false;
		this.warning = false;
		this.requirements = false;
		this.bindListeners({
			handleUserIsLoggedIn: UserActions.USER_IS_LOGGED_IN,
			handleUserLogOut: UserActions.USER_LOG_OUT,
			handleUserLogin: UserActions.USER_LOGIN,
			handleUserSignUp: UserActions.USER_SIGN_UP
		});

	}

	handleUserLogin(user){
		if(user.email && user.password){
		request
			.post(config.url + "login")
			.send({email: user.email, password: user.password})
			.set('Accept', 'application/json')
			.end(function(err, res){
				if(JSON.parse(res.text)['token']){
					localStorage.setItem('x-access-token', JSON.parse(res.text)['token']);
					return user.callback();
					
				} else {
					this.setState({warning : "Email or Password Does Not Exists!"})
				}
			}.bind(this))
		} else {
			this.setState({warning : "Please Enter Email and Password Fields!"})
		}
	}

	handleUserSignUp(user){
		if(user.email && user.password){
			var emailfilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
			var passwordfilter = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;

			if(!emailfilter.test(user.email)){
				return this.setState({warning : "Invalid Email!"})
			}
			if(!passwordfilter.test(user.password)){
				return this.setState({warning : "Please make sure your password is secured", requirements : "Password must contain one capital letter, one lowercase letter, one symbold and must be between 6 and 20 characters long!"})
			}

		request
			.post(config.url + "signup")
			.send({email: user.email, password: user.password})
			.set('Accept', 'application/json')
			.end(function(err, res){
				if(JSON.parse(res.text)['token']){
					localStorage.setItem('x-access-token', JSON.parse(res.text)['token']);
					return user.callback();
					
				} else {
					this.setState({warning : "Email already exists!"})
				}
			}.bind(this))
		} else {
			this.setState({warning : "Please Enter Email and Password Fields!"})
		}
	}

	handleUserIsLoggedIn(callback) {
		if(localStorage.getItem('x-access-token')){
			request
			.get(config.url + "api")
			.set('x-access-token', localStorage.getItem('x-access-token'))
			.set('Accept', 'application/json')
			.end(function(err, res){
				if(err){
					this.setState({userLoggedIn : false, warning: "server is unreachable!"});
					return callback();
				}

				if(JSON.parse(res.text)["authorized"]){
					this.setState({userLoggedIn : true, warning: false, requirements: false});
					callback();
				} else {
					this.setState({userLoggedIn : false});
					callback();
				}
			}.bind(this));
		} else {
			request
				.get(config.url)
				.set('Accept', 'application/json')
				.end(function(err, res){
					if(err){
						this.setState({userLoggedIn : false, warning: "server is unreachable!"});
						return callback();
					}
					this.setState({userLoggedIn : false});
					callback();
				}.bind(this));
			
		}
	}

	handleUserLogOut(callback) {
		localStorage.removeItem('x-access-token');
		callback();
	}
}

module.exports = alt.createStore(UserStore, 'UserStore');
