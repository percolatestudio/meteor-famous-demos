// 3. Physics
Famous.main(function(require) {
  var Engine = require('famous/engine');
  var Surface = require('famous/surface');
  var Modifier = require('famous/modifier');
  var Matrix = require('famous/transform');
  var EasingCurves = require('famous/animation/easing');
  var PhysicsEngine = require('famous/physics/engine');
  var Spring = require('famous/physics/forces/spring');

  var mainCtx = Engine.createContext();

  var PE = new PhysicsEngine();

  // Create a surface, content is html
  var surface = new Surface({
    size: [100, 100],
    content: "<p>Surface</p>",
    classes: ["test-surface"]
  });

  // Create a physical particle with position (p), velocity (v), mass(m)
  var particle = PE.createBody({
      m : 1,
      p : [0,0,0],
      v : [0,0,0]
  });

  // Create a spring that will act on the particle
  var spring = new Spring({
      anchor : [0,0,0],
      period : 400,
      dampingRatio : 0.07,
      length : 0
  });

  // Apply a force on the surface when it's clicked
  surface.on('click', function(e) {
    var force = { x: 0, y: 0, z: 0 -0.005 * 100};
    particle.applyForce(force);
  });

  // Link the spring, particle and surface together
  PE.attach(spring, particle);
  particle.link(surface);

  // Create the scene, applying a top level modifier to center
  // the scene vertically in the viewport
  mainCtx.add(new Modifier({origin : [.5,.5]})).link(PE);
  mainCtx.setPerspective(1000);
});