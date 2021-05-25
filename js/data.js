/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var newEntryJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', newEntryJSON);
});
