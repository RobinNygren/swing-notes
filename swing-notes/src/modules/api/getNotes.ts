import axios from 'axios';
import { Note } from '../types/interface';

const BASE_URL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';

export const getNotes = async (username: string): Promise<Note[]> => {
  const response = await axios.get<Note[]>(`https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${username}`);
  return response.data;
};
