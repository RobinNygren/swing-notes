export interface Note {
    id: string | number; // Eller number om ID är numeriskt
    username: string;
    title: string;
    note: string; // Antag att 'note' är ett fält som heter 'content'
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
  