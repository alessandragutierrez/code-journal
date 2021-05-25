/* global data */
/* exported data */

var photoUrl = document.querySelector('.photoUrl');
var photo = document.querySelector('img');

photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  photo.setAttribute('src', photoUrl.value);
}
