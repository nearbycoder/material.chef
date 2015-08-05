var alt = require("../alt");
var RecipeActions = require("../actions/RecipeActions")
class RecipeStore {
	constructor() {
		this.recipes = [];
		this.fullrecipes = [];

		this.bindListeners({
			handleRecipeSearch: RecipeActions.FILTER_RECIPES,
			handleUpdateRecipes: RecipeActions.UPDATE_RECIPES,
			handleAddRecipe: RecipeActions.ADD_RECIPE
		});
	}

	handleRecipeSearch(searchText) {
		this.recipes = this.fullrecipes.filter(function(recipe){
			if(recipe.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1 || recipe.info.toLowerCase().indexOf(searchText.toLowerCase()) != -1){
				return true;
			} else {
				return false;
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
	}
}

module.exports = alt.createStore(RecipeStore, 'RecipeStore');