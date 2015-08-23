let Home = require("./../../../scripts/components/home.jsx");
let React = require("react/addons");
let TestUtils = React.addons.TestUtils;

/*global describe it expect jasmine*/

describe("components - addrecipe - ", function() {
  it("check initial state", function() {
    let home = React.createElement(Home);
    home = TestUtils.renderIntoDocument(home);
    expect(home.componentDidMount()).toBe(undefined);
  });
});
