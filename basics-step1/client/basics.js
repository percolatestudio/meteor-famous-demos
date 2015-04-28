// 1. Surfaces
Famous.main(function(require) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');

    var mainCtx = Engine.createContext();

    // Create a surface, content is html
    var surface = new Surface({
        size: [100, 100],
        content: '<p>Surface</p>',
        classes: ['test-surface']
    });

    mainCtx.add(surface);
});
