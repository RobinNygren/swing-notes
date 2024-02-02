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