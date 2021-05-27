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
var dataEntryId;
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
  swapViews('entries');
  i = 0;
  var entryValues = renderEntry(data.entries[i]);
  $ul.prepend(entryValues);
  $entriesEmpty.classList.add('hidden');
}

function renderEntry(newEntry) {
  var $li = document.createElement('li');
  $li.className = 'row padding-bottom';
  $li.setAttribute('data-entry-id', dataEntryId);

  var $divImage = document.createElement('div');
  $divImage.className = 'column-full column-half image-container margin-bottom';

  var $entryImage = document.createElement('img');
  $entryImage.className = 'entry-image';
  $entryImage.setAttribute('src', data.entries[i].photoUrl);

  var $divText = document.createElement('div');
  $divText.className = 'column-full column-half padding-left';

  var $entryHeading = document.createElement('div');
  $entryHeading.className = 'row entry-heading';

  var $entryTitle = document.createElement('h1');
  $entryTitle.textContent = data.entries[i].title;

  var $divEditIcon = document.createElement('div');
  $divEditIcon.className = 'edit-icon';

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fas fa-pen';

  var $entryNote = document.createElement('p');
  $entryNote.className = 'entry-note';
  $entryNote.textContent = data.entries[i].notes;

  $li.appendChild($divImage);
  $li.appendChild($divText);
  $divImage.appendChild($entryImage);
  $divText.appendChild($entryHeading);
  $divText.appendChild($entryNote);
  $entryHeading.appendChild($entryTitle);
  $entryHeading.appendChild($divEditIcon);
  $divEditIcon.appendChild($editIcon);

  return $li;
}

window.addEventListener('DOMContentLoaded', function (event) {
  dataEntryId = data.entries.length;
  for (i = 0; i < data.entries.length; i++) {
    var entryValues = renderEntry(data.entries[i]);
    $ul.appendChild(entryValues);
    dataEntryId--;
  }

  if (data.entries.length > 0) {
    $entriesEmpty.classList.add('hidden');
  } else $entriesEmpty.classList.remove('hidden');

  swapViews(data.view);
});

document.addEventListener('click', function (event) {
  if (event.target.matches('.swap-view-button') !== true) {
    return;
  }
  swapViews(event.target.getAttribute('data-view'));
});

function swapViews(dataView) {
  for (i = 0; i < $viewElements.length; i++) {
    if ($viewElements[i].getAttribute('data-view') !== dataView) {
      $viewElements[i].classList.add('hidden');
    } else {
      $viewElements[i].classList.remove('hidden');
      data.view = $viewElements[i].getAttribute('data-view');
    }
  }
}

$ul.addEventListener('click', function (event) {
  if (event.target.matches('.fa-pen') !== true) {
    return;
  }
  swapViews('entry-form');
  var eventTargetId = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
  for (i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === eventTargetId) {
      data.editing = data.entries[i];
    }
  }
  editEntry();
});

function editEntry() {
  $photo.setAttribute('src', data.editing.photoUrl);
  $title.value = data.editing.title;
  $photoUrl.value = data.editing.photoUrl;
  $notes.value = data.editing.notes;
}
