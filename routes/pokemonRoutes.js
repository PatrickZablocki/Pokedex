const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hp: { type: Number },
  attack: { type: Number },
  defense: { type: Number },
  speed: { type: Number },
  type: [{ type: String }],
  moves: [{ type: String }],
  size: {type: Number},
  weight: {type:Number}
});

// Create a model for the Pokémon using the schema
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Export the model to be used in other parts of the application
module.exports = Pokemon;
