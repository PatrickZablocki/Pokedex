const mongoose = require('mongoose');

// Define the schema for a Pokémon
const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hp: { type: Number },
  attack: { type: Number },
  defense: { type: Number },
  speed: { type: Number },
  type: [{ type: String }],
  moves: [{ type: String }],
});

// Create the Pokémon model based on the schema
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon; // Export the model for use in other files
