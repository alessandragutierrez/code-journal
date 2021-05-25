/* global data */
/* exported data */
var entryForm = document.querySelector('.form');
var photo = document.querySelector('img');
var photoUrl = document.querySelector('.photoUrl');
var title = document.querySelector('.title');
var notes = document.querySelector('.notes');

photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  photo.setAttribute('src', photoUrl.value);
}

entryForm.addEventListener('submit', saveEntryValues);

function saveEntryValues(event) {
  event.preventDefault();

  var newEntry = {
    entryId: data.nextEntryId,
    photoUrl: photoUrl.value,
    title: title.value,
    notes: notes.value
  };

  data.nextEntryId++;
  data.entries.unshift(newEntry);
  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  photoUrl.value = '';
  title.value = '';
  notes.value = '';
}
