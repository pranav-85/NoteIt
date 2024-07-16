# Note-Taking App

This project is a note-taking application built with Django for the backend and React for the frontend. It uses MySQL for the database.

## Project Description

The Note-Taking App allows users to create, edit, delete, and pin notes. It provides a user-friendly interface to manage notes efficiently. The app displays notes in a card format and allows users to interact with their notes through various actions like editing, deleting, and pinning.

## Key Features

- **Create Notes**: Users can create new notes with a default title "Untitled".
- **Edit Notes**: Users can edit the content and title of existing notes.
- **Delete Notes**: Users can delete notes.
- **Pin Notes**: Users can pin notes to keep them at the top of the list.
- **Sort Notes**: Notes are sorted based on their pinned status and creation date.
- **Hover Info**: On hovering over a note, the creation and last edited dates are displayed.
- **Text Editor**: Draft.js is used for the text editor to provide a rich text editing experience.

## MySQL Database

The database schema for the notes table is as follows:

```sql
CREATE TABLE notes (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_editing BOOLEAN NOT NULL DEFAULT FALSE,
  pin_status BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
## Project Set-up
1. Installing necessary back-end frameworks
```bash
pip install django djangorestframework
```
2. Setting up the project files in your local system
```bash
git clone <url>
cd NoteIt
```
3. Running the application
```bash
python manage.py migrate
python manage.py runserver
```
4. Open http://localhost:3000 for the app.

<p color="red"> **Note:** </p>  Necessary front-end files are available in the assets folder of the NoteIt directory, there is no need to explicitly set up react files. The front-end files are present in the notes directory.
