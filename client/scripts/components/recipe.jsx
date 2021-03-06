"use strict";
const React = require("react");
const RecipeActions = require("../actions/RecipeActions");

const Recipe = React.createClass({
  recipeLoad(x) {
    RecipeActions.selectRecipe(x);
  },
  propTypes: {
    img: React.PropTypes.string,
    title: React.PropTypes.string,
    info: React.PropTypes.string,
    index: React.PropTypes.number,
    hidden: React.PropTypes.bool

  },
	render: function(){
    return(
      <div className={this.props.hidden ? 'col s12 m6 recipe-card recipe-card-leave':'col s12 m6 recipe-card' }>
        <div className="card blue">
          <div className="recipeImage" style={this.props.img ? {backgroundImage:'url(' + this.props.img + ')'} : null }></div>
          <div className="card-content white-text">
            <span className="card-title">{this.props.title}</span>
            <p>{this.props.info}</p>
          </div>
          <div className="card-action">
            <a onClick={this.recipeLoad.bind(this, this.props.index)} className="waves-effect waves-light blue darken-1 btn center">
              <i className="material-icons left"></i>View Recipe
            </a>
          </div>
        </div>
      </div>
    )
	}
});

module.exports = Recipe;
