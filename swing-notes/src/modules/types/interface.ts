export interface Note {
    id: string;
    username: string;
    title: string;
    note: string;
    createdAt: Date;
  }
  
  export interface ApiResponse {
    response: Note;
    status: number;
    notes: Note[];
  }
  
  export interface ApiError {
    message: any;
    status: number;
  }

  export interface NoteFormData {
    username: string;
    title: string;
    note: string;
  }
  