var React = require("react");
var SingleRecipe = React.createClass({
  eachIngredient(ingredient, i) {
      return (
        <li key={i}>{ingredient.ingredient} : {ingredient.measurement}</li>
      )
  },
	render: function(){
    return(
      <div className='col s12 m12 animated fadeInUp'>
        <div className="card blue">
          <div className="recipeImage" style={this.props.img ? {backgroundImage:'url(' + this.props.img + ')'} : null }></div>
          <div className="card-content white-text">
            <span className="card-title">{this.props.title}</span>
            <p>{this.props.info}</p>
            <h5>Ingredients:</h5>
            <ul>
              {this.props.ingredients.map(this.eachIngredient)}
            </ul>
            <h5>Cooking Instructions:</h5>
            <p>{this.props.cookingInstructions}</p>
          </div>
        </div>
      </div>
    ) 
	}
});

module.exports = SingleRecipe;