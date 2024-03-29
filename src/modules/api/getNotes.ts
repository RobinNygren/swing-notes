import { BASE_URL } from '../config';
import axios from 'axios';
import { Note, ApiResponse, ApiError } from '../types/interface';
import { deleteNoteOnClick } from './deleteNote';
import { updateNoteOnClick } from './putNote';


export const getNotes = async (): Promise<ApiResponse | ApiError<string, number>> => {
  try {
    // Hämtar användarnamnet och lagrar det i variabeln 'username'
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const response = await axios.get<ApiResponse>(`${BASE_URL}/api/notes/${username}`);
    
    // Hittar containern där anteckningarna ska visas
    const notesContainer = document.getElementById('notesContainer') as HTMLElement;
    notesContainer.innerHTML = ''; // Rensar anteckningarna när man söker nytt namn

    // Loopar igenom varje anteckning i svaret och skapar HTML-element för att visa dem
    response.data.notes.forEach((note: Note) => {
      // Skapar en ny sektion för varje anteckning
      const noteElement = document.createElement('section') as HTMLElement;
      noteElement.classList.add('note'); // klass för att kunna styla
      noteElement.setAttribute('data-note-id', note.id); // Lagrar anteckningens ID som ett attribut
      notesContainer.appendChild(noteElement);
      

      const titleElement = document.createElement('h3') as HTMLElement;
      titleElement.textContent = note.title;
      noteElement.appendChild(titleElement);

      const noteContentElement = document.createElement('p') as HTMLElement;
      noteContentElement.classList.add('editable-note');
      noteContentElement.setAttribute('contenteditable', 'true');
      noteContentElement.textContent = note.note;
      noteElement.appendChild(noteContentElement);

      const infoElement = document.createElement('small') as HTMLElement;
      infoElement.textContent = `Skapad av: ${note.username} den ${note.createdAt}`;
      noteElement.appendChild(infoElement);

      const btnContainer = document.createElement('div') as HTMLDivElement;
      btnContainer.classList.add('btn-container');
      noteElement.appendChild(btnContainer);

      const deleteBtn = document.createElement('button') as HTMLButtonElement;
      deleteBtn.textContent = 'Ta bort';
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.setAttribute('data-note-id', note.id);
      btnContainer.appendChild(deleteBtn);

      const updateBtn = document.createElement('button') as HTMLButtonElement;
      updateBtn.textContent = 'Uppdatera';
      updateBtn.classList.add('updateBtn');
      updateBtn.setAttribute('data-note-id', note.id);
      btnContainer.appendChild(updateBtn);

      updateBtn.addEventListener('click', updateNoteOnClick);
      deleteBtn.addEventListener('click', deleteNoteOnClick);


      
    });


    return response.data

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Hantera Axios-fel
      console.error('Axios error:', error.message);
      return {
        message: error.message,
        // Använd numerisk statuskod, använd 500 som fallback om status inte finns
        status: error.response?.status ?? 500
      };
    } else if (error instanceof Error) {
      // Hantera Script-fel
      console.error('General error:', error.message);
      return {
        message: error.message,
        status: 500 // Använd en generisk felkod som 500
      };
    }
  
    // Hantera okända fel
    console.error('An unknown error occurred');
    return {
      message: 'An unknown error occurred',
      status: 500 // Använd en generisk felkod som 500 för okända fel
    }
  }
  }
document.getElementById('searchButton')?.addEventListener('click', async () => {
  getNotes();
});