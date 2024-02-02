export interface Note {
    id: string; // Eller number om ID är numeriskt
    username: string;
    title: string;
    note: string; // Antag att 'note' är ett fält som heter 'content'
  }
  
  export interface ApiResponse<T> {
    data: T;
    status: number;
  }
  
  export interface ApiError {
    message: string;
    status: number;
  }

  export interface NoteFormData {
    username: string;
    title: string;
    note: string;
  }
  