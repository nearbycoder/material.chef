var styles = require("../../styles/main.scss");
var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Main = require("../components/home.jsx");
var Login = require("../components/login.jsx");

var routes = (
  <Route handler={App}>
    <Route path="/" handler={Main}/>
    <Route path="/login" handler={Login}/>
  </Route>
);

var App = React.createClass({
	render() {
		return(
			<div>
				<RouteHandler/>
			</div>
		)
	}
});

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});