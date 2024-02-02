import { BASE_URL } from "../config";
import axios from "axios";
import { Note, ApiResponse, ApiError } from "../types/interface";

export const putNote = async (id: string | number, noteData: Partial<Note>): Promise<ApiResponse<Note> | ApiError> => {
    try {
        const response = await axios.put<ApiResponse<Note>>(`${BASE_URL}/api/notes/:${id}`, noteData);
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