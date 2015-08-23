let AddRecipe = require("./../../../scripts/components/addrecipe.jsx");
let React = require("react/addons");
let TestUtils = React.addons.TestUtils;

/*global describe it expect jasmine*/

describe("components - addrecipe - ", function() {
  it("check initial state", function() {
    let addrecipe = React.createElement(AddRecipe);
    addrecipe = TestUtils.renderIntoDocument(addrecipe);
    expect(addrecipe.popupAddRecipe()).toBe(undefined);
  });
});
