import { BASE_URL } from '../config';
import axios from 'axios';
import { Note, ApiResponse, ApiError } from '../types/interface';
import { deleteNoteOnClick } from './deleteNote';
import { updateNoteOnClick } from './putNote';


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
      noteElement.setAttribute('data-note-id', note.id);
      notesContainer.appendChild(noteElement);
      

      const titleElement = document.createElement('h3');
      titleElement.textContent = note.title;
      noteElement.appendChild(titleElement);

      const noteContentElement = document.createElement('p');
      noteContentElement.classList.add('editable-note');
      noteContentElement.setAttribute('contenteditable', 'true');
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

      const updateBtn = document.createElement('button') as HTMLButtonElement;
      updateBtn.textContent = 'Uppdatera';
      updateBtn.classList.add('updateBtn');
      updateBtn.setAttribute('data-note-id', note.id);
      noteElement.appendChild(updateBtn);

      updateBtn.addEventListener('click', updateNoteOnClick);
      deleteBtn.addEventListener('click', deleteNoteOnClick);


      
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