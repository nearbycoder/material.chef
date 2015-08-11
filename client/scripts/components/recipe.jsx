var React = require("react");

var Recipe = React.createClass({
	render: function(){
      return(
        <div className={this.props.hidden ?  'col s12 m6 recipe-card recipe-card-leave' : 'col s12 m6 recipe-card' }>
          <div className="card blue">
            <div className="card-content white-text">
              <span className="card-title">{this.props.title}</span>
              <p>{this.props.info}</p>
            </div>
            <div className="card-action">
              <a href={this.props.link} className="waves-effect waves-light blue darken-1 btn"><i className="material-icons left"></i>View Recipe</a>
            </div>
          </div>
        </div>
      )	
	}
});

module.exports = Recipe;