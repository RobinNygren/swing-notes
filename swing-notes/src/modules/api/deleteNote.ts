import { BASE_URL } from "../config";
import axios from "axios";
import { ApiError } from "../types/interface";

export const deleteNote = async (id: string): Promise <void | ApiError> => {
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
    const noteId = target.getAttribute('data-note-id');
    
    if (noteId) {
      try {
        await deleteNote(noteId);
        target.parentElement?.remove(); // Ta bort notisen från DOM
      } catch (error) {
        console.error('Ett fel inträffade vid radering av notisen', error);
        // Hantera fel, t.ex. visa ett felmeddelande
      }
    }
  };
