import swaggerJsDoc from'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokemon API',
      version: '1.0.0',
      description: 'API pour gérer une collection de Pokemons'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      schemas: {
        Pokemon: {
          type: 'object',
          required: ['nom', 'type_primaire', 'type_secondaire', 'pv', 'attaque', 'defense'],
          properties: {
            id: {
              type: 'integer',
              description: "L'identifiant unique du Pokemon"
            },
            nom: {
              type: 'string',
              description: 'Le nom du Pokemon'
            },
            type_primaire: {
              type: 'string',
              description: 'Le type primaire du Pokemon'
            },
            type_secondaire: {
              type: 'string',
              description: 'Le type secondaire du Pokemon'
            },
            pv: {
              type: 'integer',
              description: 'Les points de vie du Pokemon'
            },
            attaque: {
              type: 'integer',
              description: "La puissance d'attaque du Pokemon"
            },
            defense: {
              type: 'integer',
              description: 'La défense du Pokemon'
            }
          },
          example: {
            id: 1,
            nom: 'Bulbasaur',
            type_primaire: 'Grass',
            type_secondaire: 'Poison',
            pv: 45,
            attaque: 49,
            defense: 49
          }
        },
        PokemonInput: {
          type: 'object',
          required: ['nom', 'type_primaire', 'type_secondaire', 'pv', 'attaque', 'defense'],
          properties: {
            nom: {
              type: 'string',
              description: 'Le nom du Pokemon'
            },
            type_primaire: {
              type: 'string',
              description: 'Le type primaire du Pokemon'
            },
            type_secondaire: {
              type: 'string',
              description: 'Le type secondaire du Pokemon'
            },
            pv: {
              type: 'integer',
              description: 'Les points de vie du Pokemon'
            },
            attaque: {
              type: 'integer',
              description: "La puissance d'attaque du Pokemon"
            },
            defense: {
              type: 'integer',
              description: 'La défense du Pokemon'
            }
          },
          example: {
            nom: 'Bulbasaur',
            type_primaire: 'Grass',
            type_secondaire: 'Poison',
            pv: 45,
            attaque: 49,
            defense: 49
          }
        },
        Error: {
          type: 'object',
          properties: {
            erreur: {
              type: 'string',
              description: "Message d'erreur"
            }
          }
        }
      }
    }
  },
  apis: ['./docs/swagger.js'] // Path to the API docs
};

// Pokemon API documentation
/**
 * @swagger
 * /api/pokemons/{id}:
 *   get:
 *     summary: Récupère un Pokemon par son ID
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du Pokemon
 *     responses:
 *       200:
 *         description: Un Pokemon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *             example:
 *               nom: "Bulbasaur"
 *               type_primaire: "Grass"
 *               type_secondaire: "Poison"
 *               pv: 45
 *               attaque: 49
 *               defense: 49
 *       404:
 *         description: Pokemon non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erreur: "Pokemon introuvable avec l'id 1245"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erreur: "Echec lors de la récupération du pokemon avec l'id 1245"
 * 
 * /api/pokemons/liste:
 *   get:
 *     summary: Récupère une liste paginée de Pokemons
 *     tags: [Pokemons]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de la page (optionnel)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type primaire pour filtrer les Pokemons (optionnel)
 *     responses:
 *       200:
 *         description: Liste paginée de Pokemons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokemons:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pokemon'
 *                 type:
 *                   type: string
 *                 nombrePokemonTotal:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPage:
 *                   type: integer
 *             example:
 *               pokemons:
 *                 - nom: "Bulbasaur"
 *                   type_primaire: "Grass"
 *                   type_secondaire: "Poison"
 *                   pv: 45
 *                   attaque: 49
 *                   defense: 49
 *               type: "Grass"
 *               nombrePokemonTotal: 94
 *               page: 2
 *               totalPage: 4
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erreur: "Echec lors de la récupération de la liste des pokemons"
 * 
 * /api/pokemons:
 *   post:
 *     summary: Ajoute un nouveau Pokemon
 *     tags: [Pokemons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokemonInput'
 *     responses:
 *       201:
 *         description: Pokemon créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pokemon:
 *                   $ref: '#/components/schemas/Pokemon'
 *             example:
 *               message: "Le pokemon Bulbasaur a été ajouté avec succès"
 *               pokemon:
 *                 id: 999
 *                 nom: "Bulbasaur"
 *                 type_primaire: "Grass"
 *                 type_secondaire: "Poison"
 *                 pv: 45
 *                 attaque: 49
 *                 defense: 49
 *       400:
 *         description: Format des données invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erreur:
 *                   type: string
 *                 champ_manquant:
 *                   type: array
 *                   items:
 *                     type: string
 *             example:
 *               erreur: "Le format des données est invalide"
 *               champ_manquant: ["pv", "attaque"]
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erreur: "Echec lors de la création du pokemon Bulbasaur"
 * 
 * /api/pokemons/{id}:
 *   put:
 *     summary: Modifie un Pokemon existant
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du Pokemon à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokemonInput'
 *     responses:
 *       200:
 *         description: Pokemon modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pokemon:
 *                   $ref: '#/components/schemas/Pokemon'
 *             example:
 *               message: "Le pokemon id 1 a été modifié avec succès"
 *               pokemon:
 *                 id: 1
 *                 nom: "Bulbasaur"
 *                 type_primaire: "Grass"
 *                 type_secondaire: "Poison"
 *                 pv: 45
 *                 attaque: 49
 *                 defense: 49
 *       400:
 *         description: Format des données invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erreur:
 *                   type: string
 *                 champ_manquant:
 *                   type: array
 *                   items:
 *                     type: string
 *             example:
 *               erreur: "Le format des données est invalide"
 *               champ_manquant: ["pv", "attaque"]
 *       404:
 *         description: Pokemon non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erreur: "Le pokemon id 999 n'existe pas dans la base de données"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erreur: "Echec lors de la modification du pokemon Bulbasaur"
 *   delete:
 *     summary: Supprime un Pokemon
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du Pokemon à supprimer
 *     responses:
 *       200:
 *         description: Pokemon supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pokemon:
 *                   $ref: '#/components/schemas/Pokemon'
 *             example:
 *               message: "Le pokemon id 1 a été supprimé avec succès"
 *               pokemon:
 *                 id: 1
 *                 nom: "Bulbasaur"
 *                 type_primaire: "Grass"
 *                 type_secondaire: "Poison"
 *                 pv: 45
 *                 attaque: 49
 *                 defense: 49
 *       404:
 *         description: Pokemon non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erreur: "Le pokemon id 999 n'existe pas dans la base de données"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erreur: "Echec lors de la suppression du pokemon 1"
 */

const specs = swaggerJsDoc(options);
const swaggerDocs = (app)=>{
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
export {swaggerDocs}