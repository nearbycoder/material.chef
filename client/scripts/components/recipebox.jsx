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
				<div className='col s12 m12 animated fadeInUp'>
	        <div className="card blue">
	          <div className="recipeImage" style={this.state.singlerecipe.img ? {backgroundImage:'url(' + this.state.singlerecipe.img + ')'} : null }></div>
	          <div className="card-content white-text">
	            <span className="card-title">{this.state.singlerecipe.title}</span>
	            <p>{this.state.singlerecipe.info}</p>
	          </div>
	        </div>
      	</div>
				: null}
			  {this.state.single ? null : this.state.recipes.map(this.eachRecipe)}
			</div>
		)
	}
});

module.exports = RecipeBox;
