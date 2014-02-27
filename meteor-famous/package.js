Package.describe({
  summary: "Contains the famo.us base library"
});

Package.on_use(function (api) {
  api.add_files(['include.js', 'build.css'], "client");
  api.add_files(['build.js'], 'client', {isAsset: true});

  api.export('Famous', 'client');
});
