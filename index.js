import express from 'express';;
import dotenv  from'dotenv';
import {router} from './src/routes/pokemons.route.js';
import {swaggerDocs} from './src/docs/swagger.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api/pokemons', router);

// API Documentation route
swaggerDocs(app);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
