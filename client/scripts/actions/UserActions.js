var alt = require('../alt');

class UserActions {
	userLogin(token) {
		this.dispatch(token);
	}
}
module.exports = alt.createActions(UserActions);