// 6. Full leaderboard
Famous.main(function(require) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ScrollView = require('famous/views/Scrollview');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout')

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

    // Link the scrollview to the layout and add the footer
    layout.content.add(scrollView);
    layout.footer.add(new Surface({
        size: [undefined, 50],
        content: Meteor.render(function() {
            return Template.leaderboard()
        }),
        classes: ['footer']
    }));

    mainCtx.add(layout);
});
