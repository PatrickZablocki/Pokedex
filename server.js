const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const port = 3000;

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.log('Fehler bei der MongoDB-Verbindung:', err));

// Define a simple route to check if the backend is running
app.get('/', (req, res) => {
  res.send('Pokedex Backend ist am Laufen!');
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
