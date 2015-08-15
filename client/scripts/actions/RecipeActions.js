var alt = require('../alt');
var test = [
	{title: "Salsbury Steak", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", ingredients: [{ingredient: 'salt', measurement: '1 teaspoon'}], instructions: "http://google.com", img: "http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2010/11/1/0/FNM_120110-WN-Dinners-036_s4x3.jpg.rend.sni12col.landscape.jpeg"},
	{title: "Mac N Cheese", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", ingredients: [] ,instructions: "http://google.com" , img: "http://www.saltychips.co/wp-content/uploads/2015/02/2-mac-cheese.jpg"},
	{title: "Supreme Pizza", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", ingredients: [], instructions: "http://google.com", img: "http://media2.s-nbcnews.com/j/MSNBC/Components/Photo/_new/g-081126-hlt-pizza-1111a.grid-6x2.jpg"},
	{title: "Fudge Brownies", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", ingredients: [], instructions: "http://google.com", img: "http://eatliveruncom.c.presscdn.com/wp-content/uploads/2011/02/TKBlog-Salted-Fudge-Brownies-header-1.jpg"},
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
	showRecipes() {
		this.dispatch()
	}
	selectRecipe(i) {
		this.dispatch(i)
	}
	animate() {
		this.dispatch()
	}
}
module.exports = alt.createActions(RecipeActions);