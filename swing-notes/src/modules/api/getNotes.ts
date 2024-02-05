import { BASE_URL } from '../config';
import axios from 'axios';
import { Note, ApiResponse, ApiError } from '../types/interface';




export const getNotes = async (username: string): Promise<ApiResponse<Note[]> | ApiError> => {
  try {
    const response = await axios.get<ApiResponse<Note[]>>(`${BASE_URL}/api/notes/${username}`);
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

const runApp = async () => {
  const username = (document.getElementById('username') as HTMLInputElement).value;
  try {
    const notes = await getNotes(username);
    console.log('Anteckningar hämtade för användaren:', username, notes);
  } catch (error) {
    console.error('Ett fel uppstod:', error);
  }
};

document.getElementById('searchButton')?.addEventListener('click', runApp);
