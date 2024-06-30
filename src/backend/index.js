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
import stripe from 'stripe';

import { subscribeEmail } from './controllers/subscribeEmail.js';
import webhookRoutes from './routes/webhookRoutes.js'; // Import the webhook routes
import rateLimit from 'express-rate-limit'; // Import rate limit for chatWithAI route


// Import Firebase initialization
import './firebase.js';

dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// in development, allow requests from localhost:3000 and 5000 and in production, allow requests from glideprompt.com
const whitelist = process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://localhost:5000'] : ['https://glideprompt.com', 'https://www.glideprompt.com' ];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Use the webhook routes before any body parsers
app.use('/', webhookRoutes);

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const stripeInstance = stripe(process.env.NODE_ENV === 'development' ? process.env.STRIPE_TEST_KEY : process.env.STRIPE_SECRET_KEY);


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
  // send the index.html file
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});


app.post('/createCheckoutSession', async (req, res) => {
  try {
    console.log('creating checkout' + JSON.stringify(req.body));
    const { plan, uid } = req.body;
  
    let priceId;
  
    if (plan === 'pro') {
      priceId = 'price_1PSf1DHShG0VPpj5GW80SWVh'; // Replace with your Pro plan price ID
    } else if (plan === 'teams') {
      priceId = 'price_1PSf20HShG0VPpj5Uqo0FNGm'; // Replace with your Teams plan price ID
    } else {
      return res.status(400).json({ error: 'Invalid plan.' });
    }
  
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1, 
      }],
      mode: 'subscription',
      success_url: 'https://www.glideprompt.com', // Replace with your success URL
      cancel_url: 'https://www.glideprompt.com', // Replace with your cancel URL
      metadata: {
        firebaseUID: uid,
      },
    });

    console.log ('session created: ' + JSON.stringify(session));
  
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});



app.post('/chatWithAI', apiLimiter, async (req, res) => {

    const { company, modelName, messages, systemMessage } = req.body;

  
    try {
      console.log ('API limiter woring' + apiLimiter )
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

app.post('/subscribeEmail', async (req, res) => {
  console.log(req.body);
    const { email } = req.body;
    try {
        await subscribeEmail(email);
        res.status(200).send('Email subscribed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    }
);