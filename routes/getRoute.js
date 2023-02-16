const express = require("express");
const router = express.Router(); // Create a new router object
const Notes = require("./notes"); // Import the Notes class
const path = require("path"); // Import the path module
const notes = new Notes(); // Create a new instance of the Notes class

// GET /notes - returns the notes.html file
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET /api/notes - reads the db.json file and returns all saved notes as JSON
router.get("/api/notes", async (req, res) => {
  const savedNotes = await notes.getNotes();
  res.json(savedNotes); 
});

module.exports = router;
