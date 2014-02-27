// Observes changes on a cursor and updates the data array inplace
cursorToArray = function(cursor, data, createFn) {
  cursor.observe({
    addedAt: function(document, atIndex, before) {
      data.splice(atIndex, 0, createFn(document));
    },
    changedAt: function(newDocument, oldDocument, atIndex) {
      // ensure the fragment createFn returns is re-active
    },
    removedAt: function(oldDocument, atIndex) {
      data.splice(atIndex, 1);
    },
    movedTo: function(document, fromIndex, toIndex, before) {
      var item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
    }
  });
}
