import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewNote } from './NewNote';
import { Home } from './Home';
import { NoteLayout } from './NoteLayout';
import { useMemo, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Note } from './Note';
import { EditNote } from './EditNote';
import axios from 'axios';

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  body: string
}

export type NoteData = {
  title: string
  body: string
}

export type GetNotesResponse = {
  notes: RawNote[];
}

function App() {

  const [notes, setNotes] = useState<RawNote[]>([]);

  const notesInfo = useMemo(() => {
    if (notes) {
      return notes.map(note => ({ ...note }));
    } else {
      return [];
    }
  }, [notes]);
 
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<RawNote[]>(
          "https://solace-notes-backend.onrender.com/api/notes"
        );
        const transformedNotes = response.data.map((note) => ({
          id: note.id,
          title: note.title,
          body: note.body,
        }));
        setNotes(transformedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);
  
  
  async function onCreateNote(data: NoteData) {
    try {
      const newNote: RawNote = { ...data, id: uuidV4() };
      const response = await axios.post<RawNote>('https://solace-notes-backend.onrender.com/api/notes', newNote);
      setNotes(prev => {
        return [...prev, response.data];
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }
  

  async function onDeleteNote(id: string) {
    try {
      await axios.delete(`https://solace-notes-backend.onrender.com/api/notes/${id}`);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  async function onUpdateNote(id: string, data: NoteData) {
    try {
      const response = await axios.put<RawNote>(`https://solace-notes-backend.onrender.com/api/notes/${id}`, data);
      setNotes(prev => prev.map(note => note.id === id ? response.data : note));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }
  

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Home notes={notesInfo}/>} />
        <Route path="/new" 
              element={<NewNote onSubmit={onCreateNote}  />} />
        <Route path="/:id" element={<NoteLayout notes={notesInfo} />} > 
            <Route index element={<Note onDelete={onDeleteNote} />} />
            <Route path="edit" element={<EditNote onSubmit={onUpdateNote} />} />
        </Route> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>

  ) 
}


export default App
