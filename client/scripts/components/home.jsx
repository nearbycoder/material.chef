const React = require("react");
require("../../styles/main.scss");
const Search = require("../components/search.jsx");
const AddRecipe = require("../components/addrecipe.jsx");
const RecipeBox = require("../components/recipebox.jsx");
const UserStore = require("../stores/UserStore.js");
const UserActions = require("../actions/UserActions.js");
const Router = require("react-router");

const App = React.createClass({
	mixins : [Router.Navigation],
	searchText: "",
	componentWillMount() {
		UserActions.userIsLoggedIn(function(){
			if(!this.state.userLoggedIn){
				/*this.transitionTo('/login');*/
			}
		}.bind(this));
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
		if(this.state.warning){
			return(
				<div className="container main-container">
					<div className="row text-align-center">
		    		<div className="btn waves-effect waves-light blue lighten-2" name="action">
					  	{this.state.warning}
						</div>
		    	</div>
		  	</div>
    	)
		} else {
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
	}
});

module.exports = App;
