import express from 'express';
import { PokemonController} from '../controllers/pokemons.controller.js';

const router = express.Router();
// Get a paginated list of Pokemons
router.get('/liste', PokemonController.getPokemonList);

// Get a Pokemon by ID
router.get('/:id', PokemonController.getPokemonById);



// Create a new Pokemon
router.post('/', PokemonController.createPokemon);

// Update a Pokemon
router.put('/:id', PokemonController.updatePokemon);

// Delete a Pokemon
router.delete('/:id', PokemonController.deletePokemon);

export { router};