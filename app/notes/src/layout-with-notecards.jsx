import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NoteCard from "./note-card.jsx";
import "./layout.css";
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Loading from "./loading.jsx";

function LayoutWithNoteCards() {

  const navigate = useNavigate();
  const [isLoading, setLoadingStatus] = useState(false);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if the cookie name matches the CSRF token name
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const [userDetails, setUserDetails] = useState();
  const [toggle, setToggle] = useState(false);

  const [notes_list, setNotesList] = useState([]);
  function fetchNotes(){
    axios.get('/home/api/notes/')
      .then(response => {
        setNotesList(response.data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      })
      ;
  }

  const sortNotes = (notes) => {
    const pinnedNotes = notes.filter((note) => note.pinStatus);
    const unpinnedNotes = notes.filter((note) => !note.pinStatus);

    pinnedNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    unpinnedNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return [...pinnedNotes, ...unpinnedNotes];
  };
  useEffect(() => {
    setLoadingStatus(true);
    fetchNotes();
    setLoadingStatus(false);
  }, []);

  useEffect(() => {
    if (Array.isArray(window.notesData)) {
      setNotesList(window.notesData);
    }
}, []);

  const [allNotEditing, setAllNotEditing] = useState(true);


  const handlePinButton = async (id) => {
    const note = notes_list.find(note => note.id === id);
    const updatedNote = {...note, pinStatus: !note.pinStatus};
    console.log(`pin status of ${id}: ${updatedNote.pinStatus}`);

    try{
      await axios.put(`/home/api/notes/${id}/`, updatedNote, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        }
      });
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
      await axios.delete(`/home/api/notes/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        }
      });
      fetchNotes();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/home/api/get_user_details/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`  
          }
        });
        setUserDetails(response.data);
        console.log(response.data);
        console.log(toggle)

        // console.log(userDetails.user_id);
        console.log(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [toggle]);


  const handleCreateButton = async () => {
  if (!userDetails) {
    console.error('User details not loaded yet.');
    return;
  }
  setToggle(!toggle);
  console.log(toggle);
  const newNote = {
    "name": "Untitled",
    "content": "",
    "isEditing": true,
    "pinStatus": false,
    "user": userDetails.user_id
  };

  try {
    const response = await axios.post('/home/api/notes/', newNote, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
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
      await axios.put(`/home/api/notes/${id}/`, updatedNote, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        }
      });
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleNameChange = async (id, title) => {
    const note = notes_list.find(note => id === note.id);
    const updatedNote = {...note, name: title};


    try{
      await axios.put(`/home/api/notes/${id}/`, updatedNote, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        }
      });
      fetchNotes();
    }catch (error){
      console.error('Error changing title', error);
    }
  };


  const handleLogout = async () =>{
    setLoadingStatus(true);
    try{
      await axios.post(`/home/api/logout/`, {},{
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        }
      });
      localStorage.removeItem('token')
      navigate('/');
      window.location.reload();
    }
    catch (error) {
      console.error('Error logging out:', error);
    }
    finally{
      setLoadingStatus(false);
    }
  };


  if(isLoading){
    return (<Loading></Loading>);
  }
  else{
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
  
          <button className="logout-button" onClick={() => handleLogout()}><span>Logout</span></button>
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
}

export default LayoutWithNoteCards;
