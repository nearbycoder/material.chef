var alt = require('../alt');

class SearchActions {
	sendSearch(searchText) {
		this.dispatch(searchText);
	}
}
module.exports = alt.createActions(SearchActions);