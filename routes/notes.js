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
}

module.exports = Notes;
