var React = require("react");
var RecipeActions = require("../actions/RecipeActions");

var AddRecipe = React.createClass({
	addRecipe(){
		RecipeActions.addRecipe({title: "Fudge Brownies", info: "Helvetica tattooed jean shorts flannel vegan. Cronut semiotics irony cold-pressed, tousled butcher drinking vinegar Bushwick tote bag synth XOXO selvage.", link: "http://google.com"});
	},
	render: function(){
		return(
			<div>
			  <div className="col s12 m12">
	          	<a className="btn-floating btn-large waves-effect waves-light blue darken-1" onClick={this.addRecipe}><i className="material-icons">add</i></a>
	      	  </div>
			</div>
		)
	}
});

module.exports = AddRecipe;

