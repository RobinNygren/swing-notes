import { BASE_URL } from "../config";
import axios from "axios";
import { ApiError } from "../types/interface";

export const deleteNote = async (id: string): Promise <void | ApiError> => {
    try {
        await axios.delete(`${BASE_URL}/api/notes/${id}`);
    }


}