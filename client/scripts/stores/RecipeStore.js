const alt = require("../alt");
const RecipeActions = require("../actions/RecipeActions")
class RecipeStore {
	constructor() {
		this.recipes = [];
		this.fullrecipes = [];
		this.hidden = false;
		this.single = false;
		this.singlerecipe = {};

		this.bindListeners({
			handleRecipeSearch: RecipeActions.FILTER_RECIPES,
			handleUpdateRecipes: RecipeActions.UPDATE_RECIPES,
			handleAddRecipe: RecipeActions.ADD_RECIPE,
			handleHideRecipes: RecipeActions.HIDE_RECIPES,
			handleShowRecipes: RecipeActions.SHOW_RECIPES,
			handleSelectRecipe: RecipeActions.SELECT_RECIPE,
			handleAnimate: RecipeActions.ANIMATE
		});
	}
	handleRecipeSearch(searchText) {
		this.recipes = this.fullrecipes.filter(function(recipe){
			if(recipe.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
			recipe.info.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
			recipe.instructions.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ){
				return true;
			}
		})
		return this.recipes
	}
	handleUpdateRecipes(recipes) {
		this.recipes = recipes;
		this.fullrecipes = recipes;
	}
	handleAddRecipe(recipe) {
		this.fullrecipes.push(recipe);
		this.recipes = this.fullrecipes;
	}
	handleHideRecipes() {
		this.hidden = true;
		this.single = false;
	}
	handleShowRecipes() {
		this.hidden = false;
		this.single = false;
	}
	handleSelectRecipe(id) {
		this.hidden = true;
		setTimeout(function(){RecipeActions.animate()}, 700);

		this.singlerecipe = this.recipes[id];
	}
	handleAnimate() {
		this.single = true;
	}
}

module.exports = alt.createStore(RecipeStore, 'RecipeStore');
