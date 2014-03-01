// 2. Animation
Famous.main(function(require) {
  var Engine = require('famous/engine');
  var Surface = require('famous/surface');
  var Modifier = require('famous/modifier');
  var Matrix = require('famous/transform');
  var EasingCurves = require('famous/transitions/easing');

  var mainCtx = Engine.createContext();

  // Create a surface, content is html
  var surface = new Surface({
    size: [100, 100],
    content: "<p>Surface</p>",
    classes: ["test-surface"]
  });

  // Define Matrix transforms for start/end positions
  // and an easing curve to transition between them
  var startPos = Matrix.translate(50,50,0);
  var endPos = Matrix.translate(200,300,0);
  var transform = new Modifier({transform: startPos});
  var easeTransition = { duration: 800, curve: EasingCurves.inOutBackNorm };

  // Apply the transition on click and switch start/end
  surface.on('click', function(e) {
    transform.setTransform(endPos, easeTransition);
    startPos = [endPos, endPos = startPos][0];
  });

  mainCtx.add(transform).link(surface);
});