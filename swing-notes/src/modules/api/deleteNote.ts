import { BASE_URL } from "../config";
import axios from "axios";
import { ApiError } from "../types/interface";

export const deleteNote = async (id: string): Promise <void | ApiError> => {
    try {
        await axios.delete(`${BASE_URL}/api/notes/:${id}`);
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