import './scss/styles.scss'
import { getNotes } from './modules/api/getNotes'
import { postNote } from './modules/api/postNote';
import { NoteFormData } from './modules/types/interface';
import { handleCreateNote } from './modules/api/postNote';
import { runApp } from './modules/api/getNotes';

document.getElementById('noteForm')?.addEventListener('submit', handleCreateNote);
document.getElementById('searchButton')?.addEventListener('click', runApp);

