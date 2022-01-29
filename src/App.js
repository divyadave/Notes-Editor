import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Split from "react-split";
import {nanoid} from "nanoid"
import { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState( () => JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || "")

 
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
  }
  setNotes(prevNote => [newNote, ...prevNote])
  setCurrentNoteId(newNote.id)

  }
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])
  
  function findNote() {
    return notes.find((note) => note.id === currentNoteId)
  }
  function deleteNote(e, id) {
    e.stopPropagation()
    setNotes(oldNotes => oldNotes.filter((note) => note.id !== id));
  }
  function updateNote(text) {
    setNotes(oldNotes => { 
      const newArray = []
      for (let index = 0; index < oldNotes.length; index++) {
        const oldNote = oldNotes[index];
        if(oldNote.id === currentNoteId)
        {
          newArray.unshift({...oldNote, body: text})
        }
        else {
          newArray.push(oldNote)
        }
    
      
        
      }
    
      return newArray;
     })
  
  }
  return (
    
   <main>
     {
     notes && notes.length > 0 ?
      <Split
     sizes={[30, 70]} 
   
    direction="horizontal"
    
                className="split"
            >
              <Sidebar notes={notes} newNote={createNewNote} deleteNote={deleteNote} setCurrentNoteId ={setCurrentNoteId} currentNote={findNote()}></Sidebar>
              <Editor currentNote={findNote()} updateNote={updateNote}></Editor> 
              </Split> : 

              <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                   >
                    Create one now
                </button>
            </div> 
}
   </main>
    
  );
}

export default App;
