var alt = require('../alt');
var test = [
	{title: "Salsbury Steak", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", link: "http://google.com"},
	{title: "Mac N Cheese", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", link: "http://google.com"},
	{title: "Supreme Pizza", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", link: "http://google.com"},
	{title: "Fudge Brownies", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", link: "http://google.com"},
]
class RecipeActions {
	updateRecipes() {
		this.dispatch(test);
	}
	filterRecipes(searchText) {
		this.dispatch(searchText);
	}
	addRecipe(recipe) {
		this.dispatch(recipe)
	}
	hideRecipes() {
		this.dispatch()
	}
}
module.exports = alt.createActions(RecipeActions);