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
var $pageTitle = document.querySelector('.page-title');
var $entryFormLastRow = document.querySelector('.last');
var $deleteModal = document.querySelector('.delete-modal');
var $delete = $entryFormLastRow.firstElementChild;
var dataEntryId;
var entryToEdit;
var editedEntryIndex;

$photoUrl.addEventListener('input', updatePhoto);
function updatePhoto(event) {
  $photo.setAttribute('src', $photoUrl.value);
}

$entryForm.addEventListener('submit', saveEntryValues);
function saveEntryValues(event) {
  event.preventDefault();
  if (data.editing !== null) {
    updateEntry();
    replaceEntryOnPage();
  } else {
    createNewEntry();
    addEntryToPage();
  }
  resetEntryForm();
  swapViews('entries');
}

$ul.addEventListener('click', function (event) {
  if (event.target.matches('.fa-pen') !== true) {
    return;
  }
  swapViews('entry-form');
  $pageTitle.textContent = 'Edit Entry';

  entryToEdit = event.target.closest('li');
  var eventTargetId = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === eventTargetId) {
      data.editing = data.entries[i];
    }
  }
  editEntryPage();
  editEntry();
});

$delete.addEventListener('click', openDeleteModal);
function openDeleteModal(event) {
  if (event.target.className !== 'delete') {
    return;
  }
  $deleteModal.classList.remove('hidden');
}

$deleteModal.addEventListener('click', function (event) {
  cancelDelete();
  confirmDelete();
});

document.addEventListener('click', function (event) {
  if (event.target.matches('.swap-view-button') !== true) {
    return;
  }
  swapViews(event.target.getAttribute('data-view'));
  newEntryPage();
});

window.addEventListener('DOMContentLoaded', function (event) {
  addEntryIdToElements();
  hideEmptyEntriesPage();
  swapViews(data.view);
});

function renderEntry(newEntry) {
  var $li = document.createElement('li');
  $li.className = 'row padding-bottom';
  $li.setAttribute('data-entry-id', dataEntryId);

  var $divImage = document.createElement('div');
  $divImage.className = 'column-full column-half image-container margin-bottom';

  var $entryImage = document.createElement('img');
  $entryImage.className = 'entry-image';
  $entryImage.setAttribute('src', newEntry.photoUrl);

  var $divText = document.createElement('div');
  $divText.className = 'column-full column-half padding-left';

  var $entryHeading = document.createElement('div');
  $entryHeading.className = 'row entry-heading';

  var $entryTitle = document.createElement('h1');
  $entryTitle.textContent = newEntry.title;

  var $divEditIcon = document.createElement('div');
  $divEditIcon.className = 'edit-icon';

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fas fa-pen';

  var $entryNote = document.createElement('p');
  $entryNote.className = 'entry-note';
  $entryNote.textContent = newEntry.notes;

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

function addEntryIdToElements() {
  dataEntryId = data.entries.length;
  for (var i = 0; i < data.entries.length; i++) {
    var entryValues = renderEntry(data.entries[i]);
    $ul.appendChild(entryValues);
    dataEntryId--;
  }
}

function newEntryPage() {
  if (event.target.closest('div').className !== 'new-button-container') {
    return;
  }
  $pageTitle.textContent = 'New Entry';
}

function createNewEntry() {
  var newEntry = {
    entryId: data.nextEntryId,
    photoUrl: $photoUrl.value,
    title: $title.value,
    notes: $notes.value
  };

  data.nextEntryId++;
  data.entries.unshift(newEntry);
}

function addEntryToPage() {
  dataEntryId = data.entries.length;
  var entryValues = renderEntry(data.entries[0]);
  $ul.prepend(entryValues);
  hideEmptyEntriesPage();
}

function editEntryPage() {
  $delete.classList.remove('hidden');
  $entryFormLastRow.lastElementChild.classList.remove('col-full-save-button');
  $entryFormLastRow.lastElementChild.classList.add('col-half-save-button');
}

function hideEditEntryPage() {
  $delete.classList.add('hidden');
  $entryFormLastRow.lastElementChild.classList.remove('col-half-save-button');
  $entryFormLastRow.lastElementChild.classList.add('col-full-save-button');
}

function editEntry() {
  $photo.setAttribute('src', data.editing.photoUrl);
  $title.value = data.editing.title;
  $photoUrl.value = data.editing.photoUrl;
  $notes.value = data.editing.notes;
}

function updateEntry() {
  findEntryIndex();
  var editedEntry = {
    entryId: dataEntryId,
    photoUrl: $photoUrl.value,
    title: $title.value,
    notes: $notes.value
  };

  data.entries.splice(editedEntryIndex, 1, editedEntry);
  data.editing = null;
}

function findEntryIndex() {
  dataEntryId = data.editing.entryId;
  function indexCondition(index) {
    return index.entryId === dataEntryId;
  }
  editedEntryIndex = data.entries.findIndex(indexCondition);
}

function replaceEntryOnPage() {
  var entryValues = renderEntry(data.entries[editedEntryIndex]);
  $ul.replaceChild(entryValues, entryToEdit);
}

function cancelDelete() {
  if (event.target.className !== 'cancel-delete-button') {
    return;
  }
  $deleteModal.classList.add('hidden');
}

function confirmDelete() {
  if (event.target.className !== 'confirm-delete-button') {
    return;
  }
  $deleteModal.classList.add('hidden');
  findEntryIndex();
  data.entries.splice(editedEntryIndex, 1);
  entryToEdit.remove();
  data.editing = null;
  resetEntryForm();
  resetEntryIds();
  swapViews('entries');
  data.nextEntryId = (data.nextEntryId - 1);
}

function resetEntryIds() {
  dataEntryId = data.entries.length;
  var ulChildren = $ul.children;
  for (var i = 0; i < data.entries.length; i++) {
    data.entries[i].entryId = dataEntryId;
    ulChildren[i].setAttribute('data-entry-id', dataEntryId);
    dataEntryId = (dataEntryId - 1);
  }
}

function resetEntryForm() {
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $photoUrl.value = '';
  $title.value = '';
  $notes.value = '';
}

function swapViews(dataView) {
  for (var i = 0; i < $viewElements.length; i++) {
    if ($viewElements[i].getAttribute('data-view') !== dataView) {
      $viewElements[i].classList.add('hidden');
    } else {
      $viewElements[i].classList.remove('hidden');
      data.view = $viewElements[i].getAttribute('data-view');
    }
  }
  resetEntryForm();
  hideEditEntryPage();
}

function hideEmptyEntriesPage() {
  if (data.entries.length > 0) {
    $entriesEmpty.classList.add('hidden');
  } else $entriesEmpty.classList.remove('hidden');
}
