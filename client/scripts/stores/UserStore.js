var alt = require("../alt");
var UserActions = require("../actions/UserActions");
var config = require("../configs/config.js");
var request = require("superagent");
class UserStore {
	constructor() {
		this.userLoggedIn = false;
		this.warning = false;
		this.bindListeners({
			handleUserIsLoggedIn: UserActions.USER_IS_LOGGED_IN,
			handleUserLogOut: UserActions.USER_LOG_OUT,
			handleUserLogin: UserActions.USER_LOGIN
		});

	}

	handleUserLogin(user){
	request
		.post(config.url + "login")
		.send({email: user.email, password: user.password})
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(JSON.parse(res.text)['token']){
				localStorage.setItem('x-access-token', JSON.parse(res.text)['token']);
				return user.callback();
				
			} else {
				this.setState({warning : true})
			}
		}.bind(this))


	}

	handleUserIsLoggedIn(callback) {
		if(localStorage.getItem('x-access-token')){
			request
			.get(config.url + "api")
			.set('x-access-token', localStorage.getItem('x-access-token'))
			.set('Accept', 'application/json')
			.end(function(err, res){
				if(JSON.parse(res.text)["authorized"]){
					this.setState({userLoggedIn : true});
					callback();
				} else {
					this.setState({userLoggedIn : false});
					callback();
				}
			}.bind(this));
		} else {
			this.setState({userLoggedIn : false});
			callback();
		}
	}

	handleUserLogOut(callback) {
		localStorage.removeItem('x-access-token');
		callback();
	}
}

module.exports = alt.createStore(UserStore, 'UserStore');
