// src/backend/index.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { chatWithClaude } from './controllers/chatWithClaude.js'; 
import { chatWithOpenAI } from './controllers/chatWithOpenAI.js';
import { chatWithReplicate } from './controllers/chatWithReplicate.js';
import { chatWithGemini } from './controllers/chatWithGemini.js';
import { admin } from './firebaseAdmin.js'; // Import Firebase Admin

// Import Firebase initialization
import './firebase.js';

dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
  // send the index.html file
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});



app.post('/chatWithAI', async (req, res) => {
  //stringify body and log
  console.log(JSON.stringify(req.body));

    const { company, modelName, messages, systemMessage } = req.body;

  
    try {
      let response;
      if (company === 'Anthropic') {
        response = await chatWithClaude(systemMessage, modelName, messages); 
      } else if (company === 'OpenAI') {
        response = await chatWithOpenAI(systemMessage, modelName, messages);
      } else if (company === 'Replicate') {
        response = await chatWithReplicate(systemMessage, modelName, messages);
      } else if (company === 'Google') {
        response = await chatWithGemini(modelName, systemMessage);
      } else {
        return res.status(400).json({ error: 'Unsupported company' });
      }
      
      res.json({ response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  //probably wont need this using firebase auth on frontend.
  //route to sign up
  // app.post('/signUp', async (req, res) => {
  //   try {
  //     console.log(req.body);
  //     const { email, password } = req.body;
  //     const user = await admin.auth().createUser({
  //       email,
  //       password,
  //     });
  //     console.log('user created: ' + user.uid);
  //     res.json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });

  // //route to log in with id token
  // app.post('/logIn', async (req, res) => {
  //   const { idToken } = req.body;
  //   try {
  //     const decodedToken = await admin.auth().verifyIdToken(idToken);
  //     const user = await admin.auth().getUser(decodedToken.uid);
  //     res.json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    }
);