import './style.css'
import { getNotes } from './modules/api/getNotes'

const runApp = async () => {
  try {
    const username = 'ada'; // Ersätt med ett faktiskt användarnamn
    const notes = await getNotes(username);
    console.log('Anteckningar hämtade för användaren:', username, notes);
  } catch (error) {
    console.error('Ett fel uppstod:', error);
  }
};

runApp();

