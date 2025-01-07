import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import registrationsRouter from './registrations.js'; // Import the registrations router

const app = express();
app.use(cors());
app.use(express.json()); // Add middleware to parse JSON request bodies

const router = express.Router();
const registrationsDir = path.resolve('registrations'); // Fix path issues for ES modules

if (!fs.existsSync(registrationsDir)) {
  fs.mkdirSync(registrationsDir);
}

app.use('/api', registrationsRouter); // Use the registrations router

const PORT = 3001; // Default port is 3000 if not set in environment variables
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default router;