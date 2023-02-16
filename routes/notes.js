const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Import the uuid module

// Create a class to handle the notes
class Notes {
  constructor() {
    this.notes = []; // Initialize the notes array
    this.filePath = path.join(__dirname, "../db/db.json"); // Set the path to the db.json file
  }
  // Get all notes
  getNotes () {
    return new Promise((resolve, reject) => 
      fs.readFile(this.filePath, "utf8", (err, data) => err ? reject(err) : resolve(JSON.parse(data)))); 
  }

  // Add a new note
  addNote (newNote) {
    newNote.id = uuidv4(); // Add a unique id to the new note
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, "utf8", (err, data) => {
        err ? reject(err) : (() => { // If there is an error, reject the promise, otherwise, immediately invoke the anonymous function
          const notes = JSON.parse(data); // Parse the data from the db.json file
          notes.push(newNote); // Add the new note to the notes array
          fs.writeFile(this.filePath, JSON.stringify(notes), (err) => err ? reject(err) : resolve(newNote)); // Write the new note to the db.json file
        })(); // Immediately invoke the anonymous function
      });
    });
  }
}// End of class

module.exports = Notes;
