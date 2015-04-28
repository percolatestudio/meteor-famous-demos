// 5. Collections to surfaces
Famous.main(function(require) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ScrollView = require('famous/views/Scrollview');

    var mainCtx = Engine.createContext();

    // Create a scrollview and array to hold surfaces
    var scrollView = new ScrollView();
    var surfaces = [];

    // Create a surface based on data in document
    function createSurface(doc) {
        return new Surface({
            size: [undefined, 100],
            content: '<p>' + doc.name + ': ' + doc.score + '</p>',
            classes: ['test-surface']
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

    mainCtx.add(scrollView);
});
