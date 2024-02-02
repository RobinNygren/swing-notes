import './style.css'
import { getNotes } from './modules/api/getNotes'
import { postNote } from './modules/api/postNote';
import { NoteFormData } from './modules/types/interface';

const runApp = async () => {
  try {
    const username = 'klas'; // Ersätt med ett faktiskt användarnamn
    const notes = await getNotes(username);
    console.log('Anteckningar hämtade för användaren:', username, notes);
  } catch (error) {
    console.error('Ett fel uppstod:', error);
  }
};

runApp();


const handleFormSubmit = async (event: Event) => {
  event.preventDefault();

  const username = (document.getElementById('username') as HTMLInputElement).value;
  const title = (document.getElementById('title') as HTMLInputElement).value;
  const note = (document.getElementById('note') as HTMLTextAreaElement).value;

  const noteData: NoteFormData = { username, title, note };

  try {
    const response = await postNote(noteData);
    console.log('Anteckning skapad:', response);
    // Hantera framgångsrikt svar här
  } catch (error) {
    console.error('Fel vid skapandet av anteckningen:', error);
  }
};

document.getElementById('noteForm')?.addEventListener('submit', handleFormSubmit);

