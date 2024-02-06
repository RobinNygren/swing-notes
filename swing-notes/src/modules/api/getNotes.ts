import { BASE_URL } from '../config';
import axios from 'axios';
import { Note, ApiResponse, ApiError } from '../types/interface';

export const getNotes = async (): Promise<ApiResponse | ApiError> => {
  try {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const response = await axios.get<ApiResponse>(`${BASE_URL}/api/notes/${username}`);
    console.log(response.data)
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
export const getNotes = async (username: string): Promise<ApiResponse<Note[]> | ApiError> => {
  try {
    const response = await axios.get<ApiResponse<Note[]>>(`${BASE_URL}/api/notes/${username}`);
    console.log(response.data)
    return response.data; // Returnerar ApiResponse<Note[]>
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Om felet är ett Axios-fel och ett svar finns, returnera det som ApiError
      return {
        message: error.message, 
        status: error.response ? error.response.status : 500
      };
    }
    // Annars, returnera ett generiskt felmeddelande
    return {
      message: "Ett okänt fel inträffade",
      status: 500
    };
  }
};



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
