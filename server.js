const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const getRoutes = require('./routes/getRoute.js');

app.use(express.urlencoded({ extended: true })); // Parse incoming string or array data
app.use(express.json()); // Parse incoming JSON data
app.use(express.static('public')); // Serve static files from the public folder

app.use(getRoutes); // Use the getRoutes router

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
