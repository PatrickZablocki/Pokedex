const mongoose = require('mongoose');
const axios = require('axios');
const Pokemon = require('../Models/Pokemon');
require('dotenv').config();

// Connect to MongoDB using the connection URI from the environment variables
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pokedex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to seed the Pokémon data into the database
const seedPokemons = async () => {
  try {
    // Loop through the first 151 Pokémon
    for (let i = 1; i <= 151; i++) {
        // Fetch data for each Pokémon from the PokeAPI
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = response.data;
    
      // Create a new Pokémon instance with random stats and API data
      const newPokemon = new Pokemon({
        name: data.name,
        hp: Math.floor(Math.random() * 100) + 1,
        attack: Math.floor(Math.random() * 100) + 1,
        defense: Math.floor(Math.random() * 100) + 1,
        speed: Math.floor(Math.random() * 100) + 1,
        type: data.types.map(type => type.type.name),
        moves: data.moves.slice(0, 5).map(move => move.move.name),
        size: Math.floor(Math.random() * 100) + 1,  
        weight: Math.floor(Math.random() * 100) + 1
      });

      // Save the new Pokémon instance to the database
      await newPokemon.save();
      console.log(`Gespeichert: ${data.name}`);
    }

    // Log success message after seeding is complete
    console.log('✅ All Pokémon have been successfully inserted into the database!');
    process.exit();
  } catch (error) {
    // Handle any errors that occur during the seeding process
    console.error('Fehler beim Speichern:', error);
    process.exit(1); // Exit with an error status
  }
};

// Call the seedPokemons function to start the process
seedPokemons();
