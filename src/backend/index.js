// src/backend/index.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { chatWithClaude } from './controllers/chatWithClaude.js'; 
import { chatWithOpenAI } from './controllers/chatWithOpenAI.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);


app.post('/chatWithAI', async (req, res) => {
    console.log('Received request to /chatWithAI' + req.body);
    const { company, modelName, messages, maxTokens, systemMessage } = req.body;
  
    try {
      let response;
      if (company === 'Anthropic') {
        response = await chatWithClaude(modelName, messages, maxTokens);
      } else if (company === 'OpenAI') {
        response = await chatWithOpenAI(systemMessage, modelName, messages);
      } else {
        return res.status(400).json({ error: 'Unsupported company' });
      }
      
      res.json({ response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/chatWithAI', (req, res) => {
    res.json({ message: 'Route is accessible' });
});

//for invalid routes
app.use((req, res) => {
    console.log('route the user requested: ', req.url)
    console.log('Req body: ', req.body)
    console.log('404: Page not found');
    res.status(404).send('404: Page not found');
    }
);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    }
);