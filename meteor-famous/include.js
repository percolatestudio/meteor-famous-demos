function loadScript(name, onload) {
  var src = Famous._basePath + '/' + name;
  var script = document.createElement("script");
  script.src = src;
  script.onload = onload;
  script.onerror = function() {
    console.log('Famous: Error fetching ' + src)
  };
  document.head.appendChild(script);
}

Famous = {
  _basePath: '/packages/famous',
  load: function(callback) {
    loadScript('build.js', function() {
      // done loading and configuring requirejs
      if (typeof callback == 'function')
        callback();
    });
  },
  main: function(cb) {
    this.load(function() {
      // famous is loaded
      Meteor.startup(function() {
        var foo = require(['index.js']);
        cb(require);
      });
    })
  }
}
