require("../../styles/main.scss");
const React = require("react");
const Router = require("react-router");
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;
const Main = require("../components/home.jsx");
const Login = require("../components/login.jsx");


const App = React.createClass({
	render() {
		return(
			<div>
				<RouteHandler/>
			</div>
		)
	}
});

const routes = (
  <Route handler={App}>
    <Route path="/" handler={Main}/>
    <Route path="/login" handler={Login}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
