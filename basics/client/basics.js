// 6. Full leaderboard
Famous.main(function(require) {
  var Engine = require('famous/engine');
  var Surface = require('famous/surface');
  var Modifier = require('famous/modifier');
  var Matrix = require('famous/transform');
  var ScrollView = require('famous/views/scrollview');
  var HeaderFooterLayout = require('famous/views/header-footer-layout')
  
  var mainCtx = Engine.createContext();
  
  // Create a 3 horitzontal paned layout
  var layout = new HeaderFooterLayout({
    headerSize: 0,
    footerSize: 50
  });

  // Create a scrollview and array to hold surfaces
  var scrollView = new ScrollView();
  var surfaces = [];

  // Create a surface based on data in document
  function createSurface(doc) {
    return new Surface({
      size: [undefined, 50],
      content: Meteor.render(function() {
        return Template.player(Players.findOne(doc._id));
      }),
      classes: ["test-surface"]
    });
  }
  
  // Re-actively maintain the surfaces array as players change.
  cursorToArray(
    Players.find({}, {sort: {score: -1, name: 1}}),
    surfaces,
    createSurface
  );

  // Include the surfaces in the scrollview and pipe
  // events to it from the engine
  scrollView.sequenceFrom(surfaces);
  Engine.pipe(scrollView);

  // Link the scrollview to the layout and add the footer
  layout.id.content.link(scrollView);
  layout.id.footer.link(new Surface({
    size: [undefined, 50],
    content: Meteor.render(function() { return Template.leaderboard()}),
    classes: ['footer']
  }));

  mainCtx.link(layout);
});

