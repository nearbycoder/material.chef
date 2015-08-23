"use strict";
const alt = require('../alt');

class UserActions {
	userIsLoggedIn(callback) {
		this.dispatch(callback);
	}
	userLogOut(callback) {
		this.dispatch(callback);
	}
	userLogin(user) {
		this.dispatch(user);
	}
	userSignUp(user) {
		this.dispatch(user);
	}
}
module.exports = alt.createActions(UserActions);
