import {Pokemon} from '../models/pokemons.model.js';
// Controller for Pokemon routes
const PokemonController = {
    // Get a Pokemon by ID
    getPokemonById: async (req, res) => {
      const id = req.params.id;
  
      // Vérifie si l'ID est valide
      if (!id || parseInt(id) <= 0) {
        res.status(400).json({
          message: "L'id du Pokémon est obligatoire et doit être supérieur à 0"
        });
        return;
      }
  
      // Utilisation de `.then().catch()`
      Pokemon.findById(id)
        .then((pokemon) => {
          if (!pokemon) {
            res.status(404).json({
              erreur: `Pokemon introuvable avec l'id ${id}`
            });
            return;
          }
          res.status(200).json(pokemon);
        })
        .catch((error) => {
          console.error('Erreur : ', error);
          res.status(500).json({
            message: `Erreur lors de la récupération du Pokémon avec l'id ${id}`
          });
        });
    },
  
    // Get a paginated list of Pokemons with optional type filter
    getPokemonList: async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const type = req.query.type || '';
      const limit = 25;
  
      Pokemon.findAll(type)
        .then((pokemons) => {
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedPokemons = pokemons.slice(startIndex, endIndex);
          const totalPages = Math.ceil(pokemons.length / limit);
  
          res.status(200).json({
            pokemons: paginatedPokemons,
            type: type,
            nombrePokemonTotal: pokemons.length,
            page: page,
            totalPage: totalPages || 1
          });
        })
        .catch((error) => {
          console.error('Erreur : ', error);
          res.status(500).json({
            erreur: "Échec lors de la récupération de la liste des Pokémon"
          });
        });
    },
  
    // Create a new Pokemon
    createPokemon: async (req, res) => {
      const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;
      
      // Validation des champs requis
      const missingFields = [];
      if (!nom) missingFields.push('nom');
      if (!type_primaire) missingFields.push('type_primaire');
      if (!type_secondaire) missingFields.push('type_secondaire');
      if (pv === undefined) missingFields.push('pv');
      if (attaque === undefined) missingFields.push('attaque');
      if (defense === undefined) missingFields.push('defense');
  
      if (missingFields.length > 0) {
        res.status(400).json({
          erreur: "Le format des données est invalide",
          champ_manquant: missingFields
        });
        return;
      }
  
      Pokemon.create({ nom, type_primaire, type_secondaire, pv, attaque, defense })
        .then((newPokemon) => {
          res.status(201).json({
            message: `Le Pokémon ${nom} a été ajouté avec succès`,
            pokemon: newPokemon
          });
        })
        .catch((error) => {
          console.error('Erreur : ', error);
          res.status(500).json({
            erreur: `Échec lors de la création du Pokémon ${nom || ""}`
          });
        });
    },
  
    // Update a Pokemon
    updatePokemon: async (req, res) => {
      const id = req.params.id;
      const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;
      
      // Vérifie si le Pokémon existe avant la mise à jour
      Pokemon.findById(id)
        .then((existingPokemon) => {
          if (!existingPokemon) {
            res.status(404).json({
              erreur: `Le Pokémon id ${id} n'existe pas dans la base de données`
            });
            return;
          }
  
          // Validation des champs requis
          const missingFields = [];
          if (!nom) missingFields.push('nom');
          if (!type_primaire) missingFields.push('type_primaire');
          if (!type_secondaire) missingFields.push('type_secondaire');
          if (pv === undefined) missingFields.push('pv');
          if (attaque === undefined) missingFields.push('attaque');
          if (defense === undefined) missingFields.push('defense');
  
          if (missingFields.length > 0) {
            res.status(400).json({
              erreur: "Le format des données est invalide",
              champ_manquant: missingFields
            });
            return;
          }
  
          return Pokemon.update(id, { nom, type_primaire, type_secondaire, pv, attaque, defense });
        })
        .then((updatedPokemon) => {
          if (updatedPokemon) {
            res.status(200).json({
              message: `Le Pokémon id ${id} a été modifié avec succès`,
              pokemon: updatedPokemon
            });
          }
        })
        .catch((error) => {
          console.error('Erreur : ', error);
          res.status(500).json({
            erreur: `Échec lors de la modification du Pokémon ${req.body.nom || ""}`
          });
        });
    },
  
    // Delete a Pokemon
    deletePokemon: async (req, res) => {
      const id = req.params.id;
  
      // Vérifie si le Pokémon existe avant suppression
      Pokemon.findById(id)
        .then((pokemon) => {
          if (!pokemon) {
            res.status(404).json({
              erreur: `Le Pokémon id ${id} n'existe pas dans la base de données`
            });
            return;
          }
  
          return Pokemon.delete(id);
        })
        .then((deletedPokemon) => {
          if (deletedPokemon) {
            res.status(200).json({
              message: `Le Pokémon id ${id} a été supprimé avec succès`,
              pokemon: deletedPokemon
            });
          }
        })
        .catch((error) => {
          console.error('Erreur : ', error);
          res.status(500).json({
            erreur: `Échec lors de la suppression du Pokémon ${id}`
          });
        });
    }
  };
  
export { PokemonController };