import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NoteCard from "./note-card.jsx";
import "./layout.css";
import axios from 'axios';

function LayoutWithNoteCards() {
  const [notes_list, setNotesList] = useState([]);
  function fetchNotes(){
    axios.get('/api/notes/')
      .then(response => {
        setNotesList(response.data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }

  const sortNotes = (notes) => {
    const pinnedNotes = notes.filter((note) => note.pinStatus);
    const unpinnedNotes = notes.filter((note) => !note.pinStatus);

    pinnedNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    unpinnedNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return [...pinnedNotes, ...unpinnedNotes];
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (Array.isArray(window.notesData)) {
      setNotesList(window.notesData);
    }
}, []);

  const [allNotEditing, setAllNotEditing] = useState(true);

  const getMaxId = () => {
    if (notes_list.length === 0) {
      return 0; 
    }
  
    const maxId = notes_list.reduce((max, note) => {
      return Math.max(max, parseInt(note.id));
    }, 0);
  
    return maxId;
  };
  const nextId = getMaxId()+1;


  const handlePinButton = async (id) => {
    const note = notes_list.find(note => note.id === id);
    const updatedNote = {...note, pinStatus: !note.pinStatus};
    console.log(`pin status of ${id}: ${updatedNote.pinStatus}`);

    try{
      await axios.put(`/api/notes/${id}/`, updatedNote);
      fetchNotes();
      console.log(`pin status of ${id}: ${updatedNote.pinStatus}`);
    }catch(error){
      console.error('Error updating note: ',error);
    }
    
  };


  useEffect(() => {
    setNotesList((prevNotes) => sortNotes(prevNotes));
  },[allNotEditing])

  useEffect(() => {
    setNotesList((prevNotes) => sortNotes(prevNotes));
  }, [notes_list]);

  function handleEditClick(id) {
    setAllNotEditing(!allNotEditing);

    const updatedNotes = notes_list.map((note) =>
      note.id === id ? { ...note, isEditing: !note.isEditing } : note
    );

    setNotesList(updatedNotes);
  }

  

  const handleDeleteButton = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}/`);
      fetchNotes();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCreateButton = async () => {

    const newNote = {
      "id": nextId.toString(),
      "name": "Untitled",
      "content": "",
      "isEditing": true,
      "pinStatus": false
  };
  // console.log(nextId.toString())
    try {
      const response = await axios.post('/api/notes/', newNote, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Created note:', response.data);
      setAllNotEditing(!allNotEditing);
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    }


  };

  const handleSaveButton = async (id, text) => {
    setAllNotEditing(!allNotEditing);
    const note = notes_list.find(note => note.id === id);
    const updatedNote = { ...note, content: text, isEditing: false };

    try {
      await axios.put(`/api/notes/${id}/`, updatedNote);
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleNameChange = async (id, title) => {
    const note = notes_list.find(note => id === note.id);
    const updatedNote = {...note, name: title};


    try{
      await axios.put(`api/notes/${id}/`, updatedNote);
      fetchNotes();
    }catch (error){
      console.error('Error changing title', error);
    }
  };

  return (
    <>
      <div className="create-row">
        <button
          className="create-button "
          style={{ opacity: allNotEditing ? 1 : 0 }}
          disabled={!allNotEditing}
          onClick={() =>
            handleCreateButton()
          }
        >
          <span>+</span>
        </button>
        <Link to="/" style={{ textDecoration: 'none'}}>
        <div className="logo">
          <span>N</span>
          <span>o</span>
          <span>t</span>
          <span>e</span>
          <span className="it">I</span>
          <span className="it">t</span>
        </div>
        </Link>
      </div>

      <div className="notes">
        {notes_list.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            name={note.name}
            content={note.content}
            pinStatus={note.pinStatus}
            editStatus={note.isEditing}
            allEditStatus={allNotEditing}
            onPinClick={handlePinButton}
            onDeleteClick={handleDeleteButton}
            onSaveClick={handleSaveButton}
            onNameChange={handleNameChange}
            onEditClick={handleEditClick}
            createdOn={note.created_at}
            editedOn={note.updated_at}
          />
        ))}
      </div>
    </>
  );
}

export default LayoutWithNoteCards;
