// src/backend/index.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { chatWithClaude } from './controllers/chatWithClaude.js'; 
import { chatWithOpenAI } from './controllers/chatWithOpenAI.js';
import { chatWithMixtral } from './controllers/chatWithMixtral.js';
import { chatWithGemini } from './controllers/chatWithGemini.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// Apply CORS based on environment, directly and synchronously
if (process.env.NODE_ENV !== 'production') {
  console.log('CORS enabled for development');
  app.use(cors()); // Direct and synchronous application of CORS
}

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);


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
      } else if (company === 'Mistral') {
        response = await chatWithMixtral(systemMessage, modelName, messages);
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

// app.post('/chatWithAI', (req, res) => {
//     res.json({ message: 'Route is accessible' });
// });

// //for invalid routes
// app.use((req, res) => {
//     console.log('route the user requested: ', req.url)
//     console.log('Req body: ', req.body)
//     console.log('404: Page not found');
//     res.status(404).send('404: Page not found');
//     }
// );


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    }
);