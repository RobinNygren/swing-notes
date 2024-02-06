import { BASE_URL } from "../config";
import axios from "axios";
import { Note, NoteFormData, ApiResponse, ApiError } from "../types/interface";

export const postNote = async (noteData: NoteFormData): Promise<ApiResponse<Note> | ApiError> => {
    console.log("Skickar noteData:", noteData);
    try {
      const response = await axios.post<ApiResponse<Note>>(`${BASE_URL}/api/notes`, noteData);
       return response.data;  // Antas returnera ApiResponse<Note>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message: error.message,
          status: error.response ? error.response.status : 500
        };
      }
      return {
        message: "Ett okänt fel inträffade",
        status: 500
      };
    }
  };

  export const handleCreateNote = async (event: Event) => {
    console.log('hejsane');
    event.preventDefault(); // Förhindra att formuläret skickas och sidan laddas om

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const note = (document.getElementById('note') as HTMLTextAreaElement).value;
  
    const noteData: NoteFormData = { username, title, note };
  
    try {
      const response = await postNote(noteData);
      console.log('Anteckning skapad:', response);
      // Hantera framgångsrikt svar här
    } catch (error: any) {
      console.error('Fel vid skapandet av anteckningen:', error.response?.data);
    }
  };



  document.getElementById('submit')?.addEventListener('click', handleCreateNote);
