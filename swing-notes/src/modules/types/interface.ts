export interface Note {
    id: string;
    username: string;
    title: string;
    note: string;
    createdAt: Date;
  }
  
  export interface ApiResponse {
    response: Note;
    status: string | number;
    notes: Note[];
  }
  
  export interface ApiError {
    message: string;
    status: string | number;
  }

  export interface NoteFormData {
    username: string;
    title: string;
    note: string;
  }
  