// 4. ScrollView
Famous.main(function(require) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ScrollView = require('famous/views/Scrollview');

    var mainCtx = Engine.createContext();

    // Create a scrollview and array to hold surfaces
    var scrollView = new ScrollView();
    var surfaces = [];

    // Create a numbered surface
    function createSurface(number) {
        return new Surface({
            size: [undefined, 100],
            content: '<p>Surface ' + number + '</p>',
            classes: ['test-surface', 'n' + i]
        });
    }

    // Add many surfaces to the scrollView
    for (var i = 0;i < 20;i++) {
        surfaces.push(createSurface(i));
    }

    // Include the surfaces in the scrollview and pipe
    // events to it from the engine
    scrollView.sequenceFrom(surfaces);
    Engine.pipe(scrollView);

    mainCtx.add(scrollView);
});
