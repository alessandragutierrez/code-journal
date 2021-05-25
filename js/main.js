/* global data */
/* exported data */
var entryForm = document.querySelector('.form');
var photo = document.querySelector('img');
var photoUrl = document.querySelector('.photoUrl');
var title = document.querySelector('.title-input');
var notes = document.querySelector('.notes-input');

photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  photo.setAttribute('src', photoUrl.value);
}

entryForm.addEventListener('submit', saveEntryValues);

function saveEntryValues(event) {
  event.preventDefault();
  // eslint-disable-next-line no-unused-vars
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
