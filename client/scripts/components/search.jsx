var React = require("react");
var SearchStore = require("../stores/SearchStore");
var RecipeActions = require("../actions/RecipeActions");
var UserActions = require("../actions/UserActions.js");
var Router = require("react-router");

var Search = React.createClass({
	mixins : [Router.Navigation],
	getInitialState() {
		return SearchStore.getState();
	},
	componentDidMount() {
		SearchStore.listen(this.onChange);
	},
	componentWillUnmount() {
		SearchStore.unlisten(this.onChange);
	},
	onChange(state) {
		this.setState(state);
	},
	filterRecipe: function(){
		var recipeSearch = this.refs.recipesearch.getDOMNode().value.trim();
		RecipeActions.filterRecipes(recipeSearch);
	},
	logout() {
		UserActions.userLogOut(function(){
			this.transitionTo('/login');
		}.bind(this));
	},
	render: function(){
		return(
			<div>
			  <nav>
			    <div className="nav-wrapper blue">
		        <div className="input-field">
		          <input id="search" ref="recipesearch" type="text" autoComplete="off" onKeyUp={this.filterRecipe} />
		          <label htmlFor="search"><i className="material-icons">search</i></label>
		          <i className="material-icons">close</i>
		        </div>
		        <button onClick={this.logout} className="nav-right btn waves-effect waves-light blue darken-2">
		        	Logout
		        </button>
			    </div>
			  </nav>
			</div>
		)
	}
});

module.exports = Search;