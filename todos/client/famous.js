Famous.main(function(require) {
  var FamousEngine = require('famous/engine');
  var FamousSurface = require('famous/surface');
  var FT = require('famous/modifier');
  var FM = require('famous/transform');
  var PhysicsEngine = require('famous/physics/engine');
  var Drag = require('famous/physics/forces/drag');
  var RotationalDrag = require('famous/physics/forces/rotational-drag');
  var Vector = require('famous/math/vector');
  var Quaternion = require('famous/math/vector');
  var TorqueSpring = require('famous/physics/forces/torque-spring');
  var Spring = require('famous/physics/forces/spring');
  
  var mainCtx = FamousEngine.createContext();
  mainCtx.setPerspective(1000);

  var pushStrength            = 0*.5;
  var torqueStrength          = .01*2;
  var torqueSpringDamping     = 20;
  var torqueSpringPeriod      = 12;
  var forceSpringDamping      = .35;
  var forceSpringPeriod       = 1100;
  var dragStrength            = .01;

  var sideLength = 500;
  var size = [sideLength, sideLength];
  var frontSurface = new FamousSurface({
    size : size,
    //---- MAGIC-----
    content: Meteor.render(function() { return Template.body()}),
    //---------------
    classes: ['main']
  });

  var backSurface = new FamousSurface({
    size : size,
    classes : ['backface'],
    properties: {
      backgroundColor: '#EBEAEC'
    }
  });

  var PE = new PhysicsEngine();

  var force  = new Vector(0,0,-pushStrength);
  var torque = new Vector(0,0,-torqueStrength);

  var center = [window.innerWidth/2, window.innerHeight/2];

  center = [window.innerWidth/2, 175 + 45, 0]
  function applyTorque(e, side){
    var location = new Vector(
      (e.offsetX - body.size[0]/2)*side,
      -(e.offsetY - body.size[1]/2)*side,
      0
    );

    body.applyForce(force);
    body.applyTorque(location.cross(torque));
  };

  frontSurface.on('click', function(e){applyTorque(e, 1)});
  backSurface.on( 'click', function(e){applyTorque(e,-1)});

  var body = PE.createBody({
    shape : PE.BODIES.RECTANGLE,
    size : size
  });

  FamousEngine.on('keypress', function(){
    body.applyTorque({z : 5});
  });

  var drag = new Drag({strength : dragStrength});
  var rotationalDrag = new RotationalDrag({strength :.1});

  var torqueSpring = new TorqueSpring({
    anchor : new Quaternion(0,0,0,0),
    period : torqueSpringPeriod,
    dampingRatio : torqueSpringDamping
  });

  var spring = new Spring({
    anchor : [0,0,0],
    period : forceSpringPeriod,
    dampingRatio : forceSpringDamping
  });

  PE.attach([drag, rotationalDrag, spring]);

  body.add(new FT(FM.translate(0,0,.1))).link(frontSurface);
  body.add(backSurface);

  //Render the output of the Physics Engine
  mainCtx.add(new FT({origin : [.5,.5]})).link(PE);

  function attachTorqueSpring(){
    this.attachedSpring = PE.attach(torqueSpring);
  }

  function detachTorqueSpring(){
    if (this.attachedSpring) PE.detach(this.attachedSpring);
      this.attachedSpring = undefined;
  }

  attachTorqueSpring();
});
