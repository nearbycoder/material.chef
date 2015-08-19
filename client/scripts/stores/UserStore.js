var alt = require("../alt");
var UserActions = require("../actions/UserActions")
class UserStore {
	constructor() {
		this.userLoggedIn = false;

		this.bindListeners({
			handleUserLogin: UserActions.USER_LOGIN
		});
	}

	handleUserLogin(token) {
		
	}
}

module.exports = alt.createStore(UserStore, 'UserStore');
