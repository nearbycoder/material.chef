var React = require("react");
var request = require("superagent");
var config = require("../configs/config.js");
var Router = require("react-router");
var UserStore = require("../stores/UserStore.js");
var UserActions = require("../actions/UserActions.js");

var Login = React.createClass({
	mixins : [Router.Navigation],
	componentWillMount() {
		UserActions.userIsLoggedIn(function(){
			if(this.state.userLoggedIn){
				this.transitionTo('/');
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
	getJWT() {
		var email = this.refs.email.getDOMNode().value.trim();
		var password = this.refs.password.getDOMNode().value.trim();
		UserActions.userLogin({email: email, password: password, callback: function(){
			this.transitionTo('/');
		}.bind(this)});
	},
	render() {
		return(
			<div className="container main-container">
				<div className='col s4 offset-s2 m4 offset-m2 animated fadeInUp'>
	        <div className="card blue">
	          <div className="card-content white-text">
	          	<div className="card-main-title">
	          		Material Recipe
	          	</div>
	          	<div className="row">
				        <div className="input-field col s12">
				          <input ref="email" className="blue-text text-lighten-5 validate loginform" id="email" type="email"/>
				          <label className="blue-text text-lighten-3" htmlFor="email">Email</label>
				        </div>
				      </div>
	          	<div className="row">
				        <div className="input-field col s12">
				          <input ref="password" className="blue-text text-lighten-5 validate loginform" id="password" type="password"/>
				          <label className="blue-text text-lighten-3" htmlFor="password">Password</label>
				        </div>
				      </div>
				      <div className="row">
				      	<div className="col s12">
				      		<button className="loginbtn btn waves-effect waves-light blue darken-2" onClick={this.getJWT}>Login</button>
	          		</div>
	          	</div>
	          	{this.state.warning ? 
	          		<div className="row text-align-center">
	          		<button className="btn waves-effect waves-light blue lighten-2" type="submit" name="action">
							    Email or Password does not exists!
							  </button>
	          		</div>
	          	: null}
	          </div>
	        </div>
	      </div>
      </div>
		)
	}
});

module.exports = Login;