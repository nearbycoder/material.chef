var React = require("react");
var SingleRecipe = React.createClass({
	render: function(){
    return(
      <div className='col s12 m12 animated fadeInUp'>
        <div className="card blue">
          <div className="recipeImage" style={this.props.img ? {backgroundImage:'url(' + this.props.img + ')'} : null }></div>
          <div className="card-content white-text">
            <span className="card-title">{this.props.title}</span>
            <p>{this.props.info}</p>
          </div>
        </div>
      </div>
    ) 
	}
});

module.exports = SingleRecipe;