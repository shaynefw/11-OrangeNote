const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET /notes - returns the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// GET /api/notes - reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /api/notes - receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client.
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id - receives a query parameter that contains the id of a note to delete. Deletes the note with the given id from the db.json file.
app.delete('/api/notes/:id', (req, res) => {
  const idToDelete = req.params.id;

  fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    const filteredNotes = notes.filter(note => note.id !== idToDelete);

    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(filteredNotes), err => {
      if (err) throw err;
      res.sendStatus(204);
    });
  });
});

// GET * - returns the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));