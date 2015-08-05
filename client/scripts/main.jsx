var styles = require("../styles/main.scss");
var React = require("react");
if(module.hot) {
  // accept itself
  module.hot.accept();
  // dispose handler
  module.hot.dispose(function() {
      var styles = require("../styles/main.scss");
  });
}

//Load React Templates

var Search = require("./components/search.jsx");
var AddRecipe = require("./components/addrecipe.jsx");
var RecipeBox = require("./components/recipebox.jsx");

var App = React.createClass({
	searchText: "",
	componentWillMount: function() {

	},
	getInitialState: function() {
		return null;
	},
	render: function() {
		return(
			<div>
				<Search />
				<div className="container main-container">
					<div className="row recipes">
						<AddRecipe />
						<RecipeBox />
					</div>
				</div>
			</div>
		)
	}
});

React.render(
	<App />,
	document.getElementById('main')
);