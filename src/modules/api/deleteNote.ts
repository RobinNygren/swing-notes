import { BASE_URL } from "../config";
import axios from "axios";
import { ApiError } from "../types/interface";

export const deleteNote = async (id: string): Promise <void | ApiError<string, number>> => {
    try {
        await axios.delete(`${BASE_URL}/api/notes/${id}`);
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

export const deleteNoteOnClick = async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    // Hämtar ID för den anteckning som ska raderas från knappens data-attribut
    const noteId: string | null = target.getAttribute('data-note-id');
    
     // Kontrollerar om noteId finns
    if (noteId) {
      try {
         // Försöker radera anteckningen med det givna ID:t
        await deleteNote(noteId);
        target.parentElement?.parentElement?.remove(); // ta bort ifrån DOM också
      } catch (error) {
        console.error('Ett fel inträffade vid radering av notisen', error);
      }
    }
  };
