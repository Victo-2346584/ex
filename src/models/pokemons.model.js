import db from "../config/db.js"; // Connexion à la base de données

const Pokemon = {
  // Get a Pokemon by ID
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM pokemon WHERE id = $1', [id], (error, results) => {
        if (error) {
          console.error('Database error:', error.message, error.code);
          reject(error);
        } else {
          resolve(results.rows[0] || null);
        }
      });
    });
  },

  // Get a paginated list of Pokemons with optional type filter
  findAll: (type = '') => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM pokemon';
      const params = [];

      if (type) {
        query += ' WHERE LOWER(type_primaire) = LOWER($1)';
        params.push(type);
      }

      db.query(query, params, (error, results) => {
        if (error) {
          console.error('Database error:', error.message, error.code);
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
    });
  },

  // Create a new Pokemon
  create: (pokemon) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO pokemon (nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES ($1, $2, $3, $4, $5, $6)',
        [pokemon.nom, pokemon.type_primaire, pokemon.type_secondaire, pokemon.pv, pokemon.attaque, pokemon.defense],
        (error, result) => {
          if (error) {
            console.error('Database error:', error.message, error.code);
            reject(error);
          } else {
            resolve({ id: result.insertId, ...pokemon });
          }
        }
      );
    });
  },

  // Update a Pokemon
  update: (id, pokemon) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE pokemon SET nom = $1, type_primaire = $2, type_secondaire = $3, pv = $4, attaque = $5, defense = $6 WHERE id = $7',
        [pokemon.nom, pokemon.type_primaire, pokemon.type_secondaire, pokemon.pv, pokemon.attaque, pokemon.defense, id],
        (error, result) => {
          if (error) {
            console.error('Database error:', error.message, error.code);
            reject(error);
          } else {
            resolve({ id: parseInt(id), ...pokemon });
          }
        }
      );
    });
  },

  // Delete a Pokemon
  delete: (id) => {
    return new Promise((resolve, reject) => {
      Pokemon.findById(id)
        .then((pokemon) => {
          if (!pokemon) return resolve(null);

          db.query('DELETE FROM pokemon WHERE id = $1', [id], (error, result) => {
            if (error) {
              console.error('Database error:', error.message, error.code);
              reject(error);
            } else {
              resolve(pokemon.rows);
            }
          });
        })
        .catch(reject);
    });
  }
};

export { Pokemon };
