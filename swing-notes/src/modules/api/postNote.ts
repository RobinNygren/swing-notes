import { BASE_URL } from "../config";
import axios, { AxiosError } from "axios";
import { Note, NoteFormData, ApiResponse, ApiError } from "../types/interface";
import { getNotes } from "./getNotes";



export const postNote = async (noteData: NoteFormData): Promise<ApiResponse | ApiError> => {
    
    try {
      const response = await axios.post<ApiResponse>(`${BASE_URL}/api/notes`, noteData);
       return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
      console.error(error.message)
        return {
          message: error.message,
          status: error.response ? error.response.status : 500
        };
    }
    // Hantera övriga typer av fel
    console.error("Ett oväntat fel inträffade");
    return {
      message: "Ett oväntat fel inträffade",
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

      await getNotes();
    } catch (error: any) {
      console.error('Fel vid skapandet av anteckningen:', error.response?.data);
    }
  };



  document.getElementById('submit')?.addEventListener('click', handleCreateNote);
