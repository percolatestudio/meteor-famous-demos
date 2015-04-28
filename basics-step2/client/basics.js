// 2. Animation
Famous.main(function(require) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');

    var mainCtx = Engine.createContext();

    // Create a surface, content is html
    var surface = new Surface({
        size: [100, 100],
        content: '<p>Surface</p>',
        classes: ['test-surface']
    });

    // Define Matrix transforms for start/end positions
    // and an easing curve to transition between them
    var startPos = Transform.translate(50,50,0);
    var endPos = Transform.translate(200,300,0);
    var transform = new StateModifier({transform: startPos});
    var easeTransition = { duration: 800, curve: Easing.inOutBack };

    // Apply the transition on click and switch start/end
    surface.on('click', function(e) {
        transform.setTransform(endPos, easeTransition);
        startPos = [endPos, endPos = startPos][0];
    });

    mainCtx.add(transform).add(surface);
});
