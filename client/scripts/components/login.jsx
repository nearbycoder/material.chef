var React = require("react");

var Login = React.createClass({
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
				          <input className="blue-text text-lighten-5 validate loginform" id="email" type="email"/>
				          <label className="blue-text text-lighten-3" htmlFor="email">Email</label>
				        </div>
				      </div>
	          	<div className="row">
				        <div className="input-field col s12">
				          <input className="blue-text text-lighten-5 validate loginform" id="password" type="password"/>
				          <label className="blue-text text-lighten-3" htmlFor="password">Password</label>
				        </div>
				      </div>
				      <div className="row">
				      	<div className="col s12">
				      		<button className="loginbtn btn waves-effect waves-light blue darken-2" type="submit" name="action">Login</button>
	          		</div>
	          	</div>
	          </div>
	        </div>
	      </div>
      </div>
		)
	}
});

module.exports = Login;