const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('./Models/Pokemon');
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

// Define the /pokemons route to fetch a Pokémon by name
app.get('/pokemons', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Please provide a Pokémon name.' });
    }

    const pokemon = await Pokemon.findOne({ name: name.toLowerCase() });

    if (!pokemon) {
      return res.status(404).json({ message: `Pokémon with the name ${name} not found.` });
    }

    res.json(pokemon);
  } catch (error) {
    console.error('Error fetching the Pokémon:', error);
    res.status(500).json({ message: 'Error fetching the Pokémon' });
  }
});


// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
