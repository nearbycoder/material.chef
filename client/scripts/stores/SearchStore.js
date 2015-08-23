"use strict";
const alt = require("../alt");
const SearchActions = require("../actions/SearchActions")
class SearchStore {
	constructor() {
		this.searchText = "";

		this.bindListeners({
			handleSendSearch: SearchActions.SEND_SEARCH
		});
	}

	handleSendSearch(searchText) {
		this.searchText = searchText;
	}
}

module.exports = alt.createStore(SearchStore, 'SearchStore');
