var React = require("react");
var Recipe = require("./recipe.jsx");
var SingleRecipe = require("./singlerecipe.jsx");
var SearchStore = require("../stores/SearchStore");
var RecipeStore = require("../stores/RecipeStore");
var RecipeActions = require("../actions/RecipeActions");

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
				img={recipe.img}
				title = {recipe.title}
				info = {recipe.info}
				link = {recipe.link}
				user = {recipe.user}
				hidden = {this.state.hidden}
			/>	
		)
	},
	render: function(){
		return(
			<div>
				{this.state.single ?
				<SingleRecipe
				img={this.state.singlerecipe.img}
				title={this.state.singlerecipe.title}
				info={this.state.singlerecipe.info}
				ingredients={this.state.singlerecipe.ingredients}
				instructions={this.state.singlerecipe.instructions}
				/>
				: this.state.recipes.map(this.eachRecipe)}
			</div>
		)
	}
});

module.exports = RecipeBox;
