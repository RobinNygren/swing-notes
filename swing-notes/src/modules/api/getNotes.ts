import { BASE_URL } from '../config';
import axios from 'axios';
import { Note, ApiResponse, ApiError } from '../types/interface';
import { deleteNoteOnClick } from './deleteNote';
export const getNotes = async (): Promise<ApiResponse | ApiError> => {
  try {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const response = await axios.get<ApiResponse>(`${BASE_URL}/api/notes/${username}`);
    console.log(response.data)

    const notesContainer = document.getElementById('notesContainer') as HTMLElement;
    notesContainer.innerHTML = ''; // Rensar anteckningarna när man söker nytt namn

    response.data.notes.forEach((note: Note) => {
      const noteElement = document.createElement('section');
      noteElement.classList.add('note'); // klass för att kunna styla

      const titleElement = document.createElement('h3');
      titleElement.textContent = note.title;
      noteElement.appendChild(titleElement);

      const noteContentElement = document.createElement('p');
      noteContentElement.textContent = note.note;
      noteElement.appendChild(noteContentElement);

      const infoElement = document.createElement('small');
      infoElement.textContent = `Skapad av: ${note.username} den ${note.createdAt}`;
      noteElement.appendChild(infoElement);

      const deleteBtn = document.createElement('button') as HTMLButtonElement;
      deleteBtn.textContent = 'Ta bort';
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.setAttribute('data-note-id', note.id);
      noteElement.appendChild(deleteBtn);

      deleteBtn.addEventListener('click', deleteNoteOnClick);


      notesContainer.appendChild(noteElement);
    });


    return response.data

  } catch (error: any) {
    console.error(error)
    return {
      message: error.message,
      status: error.response.status
    }
  }
  
}

document.getElementById('searchButton')?.addEventListener('click', async () => {
  getNotes();
});
/* 


// loopa fram och visa anteckningar
 
const displayNotes = (notes: Note[]) => {
  const container = document.getElementById('notesContainer');
  if (!container) return; // Om containern inte hittas, avbryt funktionen

  container.innerHTML = ''; // Rensa befintligt innehåll

  notes.forEach(note => {
    const noteElement = document.createElement('section');
    noteElement.className = 'note'; // Lägg till en klass för styling
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.note}</p>
      <p>${note.createdAt}</p>
      <small>${note.username}</small>
    `;

    container.appendChild(noteElement);
  });
};  */
