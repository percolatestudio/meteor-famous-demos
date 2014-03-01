// 1. Surfaces
Famous.main(function(require) {
  var Engine = require('famous/engine');
  var Surface = require('famous/surface');

  var mainCtx = Engine.createContext();

  // Create a surface, content is html
  var surface = new Surface({
    size: [100, 100],
    content: "<p>Surface</p>",
    classes: ["test-surface"]
  });

  mainCtx.add(surface);
});

