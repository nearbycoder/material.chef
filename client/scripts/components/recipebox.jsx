var React = require("react");
var Recipe = require("./recipe.jsx");
var SearchStore = require("../stores/SearchStore");
var RecipeStore = require("../stores/RecipeStore");
var RecipeActions = require("../actions/RecipeActions")

var RecipeBox = React.createClass({
	getInitialState() {
		return RecipeStore.getState();
	},
	componentDidMount() {
		SearchStore.listen(this.onChange);
		RecipeStore.listen(this.onChange);
		RecipeActions.updateRecipes();
	},
	componentWillUnmount() {
		SearchStore.unlisten(this.onChange);
		RecipeStore.unlisten(this.onChange);
	},
	onChange(state) {
		this.setState(state);
	},
	eachRecipe: function(recipe, i) {
		return (
			<Recipe
				index={i}
				key={i}
				title = {recipe.title}
				info = {recipe.info}
				link = {recipe.link}
				user = {recipe.user}
			/>	
		)
	},
	render: function(){
		return(
			<div>
			  {this.state.recipes.map(this.eachRecipe)}
			</div>
		)
	}
});

module.exports = RecipeBox;
