/* global data */
/* exported data */

var photoUrl = document.querySelector('.photoUrl');
var photo = document.querySelector('img');
var entryForm = document.querySelector('.form');

photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  photo.setAttribute('src', photoUrl.value);
}

entryForm.addEventListener('submit', saveEntryValues);

function saveEntryValues(event) {

}
