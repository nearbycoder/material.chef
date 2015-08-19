var React = require("react");
var styles = require("../../styles/main.scss");
var Search = require("../components/search.jsx");
var AddRecipe = require("../components/addrecipe.jsx");
var RecipeBox = require("../components/recipebox.jsx");
var UserStore = require("../stores/UserStore.js");
var UserActions = require("../actions/UserActions.js");
var Router = require("react-router");

var App = React.createClass({
	mixins : [Router.Navigation],

	searchText: "",
	componentWillMount: function() {
		 if(!this.state.userLoggedIn){
		 	 this.transitionTo('/login');
		 }  
	},
	getInitialState() {
		return UserStore.getState();
	},
	componentDidMount() {
		UserStore.listen(this.onChange);
	},
	componentWillUnmount() {
		UserStore.unlisten(this.onChange);
	},
	onChange(state) {
		this.setState(state);
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

module.exports = App;