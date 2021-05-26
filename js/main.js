/* global data */
/* exported data */
var $entryForm = document.querySelector('.form');
var $photo = document.querySelector('img');
var $photoUrl = document.querySelector('.photoUrl');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
var $ul = document.querySelector('ul');
var $viewElements = document.querySelectorAll('.view');
var $entriesEmpty = document.querySelector('.entries-empty');
var i;

$photoUrl.addEventListener('input', updatePhoto);
function updatePhoto(event) {
  $photo.setAttribute('src', $photoUrl.value);
}

$entryForm.addEventListener('submit', saveEntryValues);
function saveEntryValues(event) {
  event.preventDefault();

  var newEntry = {
    entryId: data.nextEntryId,
    photoUrl: $photoUrl.value,
    title: $title.value,
    notes: $notes.value
  };

  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $photoUrl.value = '';
  $title.value = '';
  $notes.value = '';

  for (i = 0; i < $viewElements.length; i++) {
    if ($viewElements[i].getAttribute('data-view') !== 'entries') {
      $viewElements[i].classList.add('hidden');
    } else $viewElements[i].classList.remove('hidden');
  }
  data.view = 'entries';
  location.reload();
}

function renderEntry(newEntry) {
  var $li = document.createElement('li');
  $li.className = 'row padding-bottom';

  var $divImage = document.createElement('div');
  $divImage.className = 'column-full column-half image-container margin-bottom';

  var $divText = document.createElement('div');
  $divText.className = 'column-full column-half padding-left';

  var $entryImage = document.createElement('img');
  $entryImage.className = 'entry-image';
  $entryImage.setAttribute('src', data.entries[i].photoUrl);

  var $entryTitle = document.createElement('h1');
  $entryTitle.className = 'entry-title';
  $entryTitle.textContent = data.entries[i].title;

  var $entryNote = document.createElement('p');
  $entryNote.className = 'entry-note';
  $entryNote.textContent = data.entries[i].notes;

  $li.appendChild($divImage);
  $li.appendChild($divText);
  $divImage.appendChild($entryImage);
  $divText.appendChild($entryTitle);
  $divText.appendChild($entryNote);

  return $li;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (i = 0; i < data.entries.length; i++) {
    var $entryValues = renderEntry(data.entries[i]);
    $ul.appendChild($entryValues);
  }

  if (data.entries.length > 0) {
    $entriesEmpty.classList.add('hidden');
  } else $entriesEmpty.classList.remove('hidden');

  for (i = 0; i < $viewElements.length; i++) {
    if ($viewElements[i].getAttribute('data-view') !== data.view) {
      $viewElements[i].classList.add('hidden');
    } else $viewElements[i].classList.remove('hidden');
  }
});

document.addEventListener('click', function (event) {
  if (event.target.matches('.swap-view-button') !== true) {
    return;
  }
  for (i = 0; i < $viewElements.length; i++) {
    if ($viewElements[i].getAttribute('data-view') !== event.target.getAttribute('data-view')) {
      $viewElements[i].classList.add('hidden');

    } else {
      $viewElements[i].classList.remove('hidden');
      data.view = $viewElements[i].getAttribute('data-view');
    }
  }
});
