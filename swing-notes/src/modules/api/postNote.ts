import { BASE_URL } from "../config";
import axios from "axios";
import { NoteFormData, ApiResponse, ApiError } from "../types/interface";
import { getNotes } from "./getNotes";



export const postNote = async (noteData: NoteFormData): Promise<ApiResponse | ApiError<string, number>> => {
    
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
    event.preventDefault(); // Förhindra att formuläret skickas och sidan laddas om

    // Hämtar användarinput från formuläret
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const note = (document.getElementById('note') as HTMLTextAreaElement).value;
    
    // Skapar ett objekt med formulärdata
    const noteData: NoteFormData = { username, title, note };
  
    try {
      // skicka den nya anteckningen till servern
      await postNote(noteData);
      

      await getNotes();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        //  ett AxiosError
        console.error('Fel vid skapandet av anteckningen:', error.response?.data);
      } else {
        // För alla andra typer av fel
        console.error('Ett oväntat fel inträffade');
      }
    }
  }



  document.getElementById('submit')?.addEventListener('click', handleCreateNote);
