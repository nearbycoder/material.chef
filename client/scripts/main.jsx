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