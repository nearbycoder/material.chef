"use strict";
const React = require("react");
const Recipe = require("./recipe.jsx");
const SingleRecipe = require("./singlerecipe.jsx");
const SearchStore = require("../stores/SearchStore");
const RecipeStore = require("../stores/RecipeStore");
const RecipeActions = require("../actions/RecipeActions");

const RecipeBox = React.createClass({
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
				cookingInstructions={this.state.singlerecipe.cookingInstructions}
				/>
				: this.state.recipes.map(this.eachRecipe)}
			</div>
		)
	}
});

module.exports = RecipeBox;
