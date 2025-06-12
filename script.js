const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

function createNoteBox() {
  const textarea = document.createElement('textarea');
  textarea.className = 'note';
  textarea.placeholder = 'Write your note here...';
  notesContainer.appendChild(textarea);
}

// Add a default note on load
createNoteBox();

// Add more notes on button click
addNoteBtn.addEventListener('click', createNoteBox);
