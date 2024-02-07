import { BASE_URL } from "../config";
import axios from "axios";
import { Note, ApiResponse, ApiError } from "../types/interface";

export const putNote = async (id: string, noteData: Partial<Note>): Promise<ApiResponse | ApiError> => {
    try {
        const response = await axios.put<ApiResponse>(`${BASE_URL}/api/notes/${id}`, noteData);
        return response.data; // returnera Apiresponse<Note>
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

export const updateNoteOnClick = async (event: Event) => {
    const button = event.target as HTMLButtonElement;
    const noteId = button.getAttribute('data-note-id');
    const noteTextarea = document.getElementById("note") as HTMLTextAreaElement;
    const noteContent = noteTextarea.value;

    if (noteId && noteContent) {
        try {
            const response = await putNote(noteId, { note: noteContent });
            console.log('Notis uppdaterad:', response);
        } catch (error) {
            console.error('Fel vid uppdatering av notis:', error);
        }
    } else {
        console.error('Notis-ID eller innehåll saknas');
    }
};