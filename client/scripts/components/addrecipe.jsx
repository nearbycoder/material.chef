var React = require("react");
var RecipeActions = require("../actions/RecipeActions");
var RecipeStore = require("../stores/RecipeStore");
var UserStore = require("../stores/UserStore.js");
var AddRecipe = React.createClass({
	getInitialState() {
		return {
			modal : false,
			invalid: false,
			ingredients : [{}]
		}
	},
	componentDidMount() {
		RecipeStore.listen(this.onChange);
		RecipeActions.updateRecipes();
	},
	componentWillUnmount() {
		RecipeStore.unlisten(this.onChange);
	},
	onChange(state) {
		this.setState(state);
	},
	popupAddRecipe(){
		this.setState({modal: true, invalid: false, ingredients: [{}]});
		RecipeActions.hideRecipes();
	},
	popupHideAddRecipe(){
		this.setState({modal: false, invalid: false, ingredients: [{}]});
		RecipeActions.showRecipes();
	},
	addRecipe() {
		var _this = this;
		var title = this.refs.title.getDOMNode().value.trim();
		var description = this.refs.description.getDOMNode().value.trim();
		var cookingInstructions = _this.refs.cookingInstructions.getDOMNode().value.trim();
		var image = _this.refs.image.getDOMNode().value.trim();
		var ingredients = [];

		this.state.ingredients.forEach(function(el, index) {
			var ingredient = _this.refs['ingredient' + index].getDOMNode().value.trim();
			var measurement = _this.refs['measurement' + index].getDOMNode().value.trim();
			ingredients.push({ingredient: ingredient, measurement: measurement})
		})
		if(title && description && cookingInstructions){
			RecipeActions.addRecipe({title: title, info: description, ingredients: ingredients, cookingInstructions: cookingInstructions, img: image});
			this.setState({modal: false, ingredients: [{}], invalid: false});
			RecipeActions.showRecipes();
		} else {
			this.setState({invalid: true});
		}
		
	},
	addIngredient() {
		this.setState({ingredients: this.state.ingredients.concat({})});
	},
	removeIngredient(i) {
		var ingredients = this.state.ingredients;
		ingredients.splice(i, 1);
		this.setState({ingredients: ingredients});
	},
	eachIngredient(ingredient, i) {
		var length = this.state.ingredients.length - 1;
		return (
			<div key={i}>
				{i == length && i != 0 ?
				<div className="col s2">
		      <a className="animated rubberBand btn-floating btn-large waves-effect waves-light red lighten-1" onClick={this.removeIngredient.bind(this, i)}><i className="material-icons">clear</i></a>
		    </div> : null }
				<div className={i != length || i == 0 ? "input-field col s4 offset-s2" : "input-field col s4"}>
	        <input ref={"ingredient"+i} type="text" id={"ingredient"+i} className="red-text text-lighten-4"/>
	        <label htmlFor={"ingredient"+i} className="red-text text-lighten-4">Ingredient</label>
	      </div>
	      <div className="input-field col s4">
	        <input type="text" ref={"measurement"+i} id={"measurement"+i} className="red-text text-lighten-4"/>
	        <label htmlFor={"measurement"+i} className="red-text text-lighten-4">Measurement</label>
	      </div>
	      {i == length ?
	      <div className="col s2">
        	<a className="animated rubberBand btn-floating btn-large waves-effect waves-light red lighten-1" onClick={this.addIngredient}><i className="material-icons">add</i></a>
        </div> : null }
        <div className="clear">
		    </div>
	    </div>
		)
	},
	render() {	
		if(this.state.modal && UserStore.getState()["userLoggedIn"]){
			return (
				<div>
				  <div className="col s12 m12">
		        <a className="animated flip btn-floating btn-large waves-effect waves-light red lighten-1 addRecipeButton" onClick={this.state.model == true ? this.popupAddRecipe : this.popupHideAddRecipe}><i className="material-icons">clear</i></a>
		      </div>
		      <div className="col s12 m12 addRecipe animated pulse">
		        <div className="input-field col s8 offset-s2 red-text text-lighten-4">
		          <input required ref="title" type="text" id="title" className="red-text text-lighten-4"/>
		          <label htmlFor="title" className="red-text text-lighten-4">Recipe Name</label>
		        </div>
		        <div className="input-field col s8 offset-s2">
		          <textarea required ref="description" id="description" className="materialize-textarea red-text text-lighten-4"></textarea>
		          <label htmlFor="description">Description</label>
		        </div>
		        <div className="clear">
		        </div>
		        {this.state.ingredients.map(this.eachIngredient)}
		        <div className="input-field col s8 offset-s2">
		          <textarea required ref="cookingInstructions" id="cookingInstructions" className="materialize-textarea red-text text-lighten-4"></textarea>
		          <label htmlFor="cookingInstructions">Cooking Instructions</label>
		        </div>
		        <div className="input-field col s8 offset-s2 red-text text-lighten-4">
		          <input required ref="image" type="text" id="image_url" className="red-text text-lighten-4"/>
		          <label htmlFor="image_url" className="red-text text-lighten-4">Image Url</label>
		        </div>
		        <div className="col s12">
		        	<a className="waves-effect waves-light red darken-1 btn" onClick={this.addRecipe}><i className="material-icons left"></i>Add Recipe</a>
		        </div>
		        {this.state.invalid ? 
		        	<div className="col s12">
			        	<a className="waves-effect waves-light red darken-3 btn" onClick={this.addRecipe}><i className="material-icons left"></i>Recipe Name, Description and Cooking Instructions are required!</a>
			        </div> : null}
		      </div>

				</div>
			);
		} else if(RecipeStore.getState()["single"]) {
			return (
				<div>
			  	<div className="col s12 m12">
						<a className="animated flip btn-floating btn-large waves-effect waves-light blue lighten-1 addRecipeButton go-back" onClick={this.state.model == true ? this.popupAddRecipe : this.popupHideAddRecipe}>
							<i className="material-icons">clear</i>
						</a>
					</div>
				</div>
			)
		} else if(UserStore.getState()["userLoggedIn"]){
			return (
				<div>
				  <div className="col s12 m12">
				  	<a className="btn-floating btn-large waves-effect waves-light blue darken-1" onClick={this.popupAddRecipe}><i className="material-icons">add</i></a>
		      </div>
				</div>
			)
		} else {
			return(null)
		}
	}
});

module.exports = AddRecipe;

