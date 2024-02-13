import { BASE_URL } from "../config";
import axios from "axios";
import { Note, ApiResponse, ApiError } from "../types/interface";

export const putNote = async (id: string, noteData: Partial<Note>): Promise<ApiResponse | ApiError<string, number>> => {
    try {
        const response = await axios.put<ApiResponse>(`${BASE_URL}/api/notes/${id}`, noteData);
        return response.data;
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
     // Hämtar den klickade knappen och hämtar anteckningens ID
    const button = event.target as HTMLButtonElement;
    const noteId: string | null = button.getAttribute('data-note-id');
    // Hittar den specifika anteckningssektionen med hjälp av noteId
    const noteSection: Element | null = document.querySelector(`section[data-note-id="${noteId}"]`);
    // Hittar elementet som innehåller anteckningens text
    const noteContentElement: Element | null = noteSection ? noteSection.querySelector('p.editable-note') : null;
    // Hämtar textinnehållet från anteckningen, eller använder en tom sträng om det inte finns något innehåll
    const noteContent: string = noteContentElement ? noteContentElement.textContent || '' : ''; // om null använd tom sträng

    if (noteId && noteContent !== '') {  // kolla så att det inte är tomma strängar
        try {
            // uppdatera anteckningen
            await putNote(noteId, { note: noteContent });
            
        } catch (error) {
            console.error('Fel vid uppdatering av notis:', error);
        }
    } else {
        console.error('Notis-ID eller innehåll saknas');
    }
};