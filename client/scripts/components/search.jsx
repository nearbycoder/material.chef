var React = require("react");
var SearchStore = require("../stores/SearchStore");
var RecipeActions = require("../actions/RecipeActions");

var Search = React.createClass({
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
	render: function(){
		return(
			<div>
			  <nav>
			    <div className="nav-wrapper blue">
			      <form>
			        <div className="input-field">
			          <input id="search" ref="recipesearch" type="text" autoComplete="off" onKeyUp={this.filterRecipe} />
			          <label htmlFor="search"><i className="material-icons">search</i></label>
			          <i className="material-icons">close</i>
			        </div>
			      </form>
			    </div>
			  </nav>
			</div>
		)
	}
});

module.exports = Search;