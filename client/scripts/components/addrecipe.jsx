var React = require("react");
var RecipeActions = require("../actions/RecipeActions");

var AddRecipe = React.createClass({
	getInitialState() {
		return {
			modal : false
		}
	},
	popupAddRecipe(){
		this.setState({modal: !this.state.modal});
	},
	addRecipe() {
		var title = this.refs.title.getDOMNode().value.trim();
		var description = this.refs.description.getDOMNode().value.trim();
		var link = this.refs.link.getDOMNode().value.trim();
		RecipeActions.addRecipe({title: title, info: description, link: link});
		this.setState({modal: !this.state.modal});
	},
	render() {	
		if(this.state.modal){
			return (
				<div>
				  <div className="col s12 m12">
		        <a className="btn-floating btn-large waves-effect waves-light red lighten-1 addRecipeButton" onClick={this.popupAddRecipe}><i className="material-icons">clear</i></a>
		      </div>
		      <div className="col s12 m12 addRecipe">
		        <div className="input-field col s8 offset-s2 red-text text-lighten-4">
		          <input ref="title" type="text" id="title" className="red-text text-lighten-4"/>
		          <label htmlFor="title" className="red-text text-lighten-4">Recipe Name</label>
		        </div>
		        <div className="input-field col s8 offset-s2">
		          <textarea ref="description" id="description" className="materialize-textarea red-text text-lighten-4"></textarea>
		          <label htmlFor="description">Description</label>
		        </div>
		        <div className="input-field col s8 offset-s2">
		          <input ref="link" type="text" id="link" className="red-text text-lighten-4"/>
		          <label htmlFor="link" className="red-text text-lighten-4">Link</label>
		        </div>
		        <a className="waves-effect waves-light red darken-1 btn" onClick={this.addRecipe}><i className="material-icons left"></i>Add Recipe</a>
		      </div>

				</div>
			);
		}

		return (
			<div>
			  <div className="col s12 m12">
	        <a className="btn-floating btn-large waves-effect waves-light blue darken-1" onClick={this.popupAddRecipe}><i className="material-icons">add</i></a>
	      </div>
			</div>
		)
	}
});

module.exports = AddRecipe;

