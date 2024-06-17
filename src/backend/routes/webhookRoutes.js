// src/backend/routes/webhookRoutes.js
import express from 'express';
import { admin } from '../firebaseAdmin.js'; // Import Firebase Admin
import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const stripeInstance = stripe(process.env.NODE_ENV === 'development' ? process.env.STRIPE_TEST_KEY : process.env.STRIPE_SECRET_KEY);

// Webhook endpoint
router.post('/stripeWebhook', express.raw({ type: 'application/json' }), async (req, res) => {
  console.log('stripe webhook hit');

  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_KEY;

  const sig = req.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripeInstance.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
    console.log('stripe event created: ' + stripeEvent.type);

    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object;
        // Log metadata to debug
        console.log('session metadata:', session.metadata);

        // Fulfill the purchase...
        const userRef = admin.firestore().collection('users').doc(session.metadata.firebaseUID);
        // Fetch the line items to get the price ID
        const lineItems = await stripeInstance.checkout.sessions.listLineItems(session.id);
        const priceId = lineItems.data[0].price.id;

        if (priceId === 'price_1PSez6HShG0VPpj5ebYW3WFm') {
          await userRef.update({
            paymentPlan: 'pro',
            creditsRemaining: 100,
          });
        } else if (priceId === 'price_1PSf0UHShG0VPpj5oSRdyKoc') {
          await userRef.update({
            paymentPlan: 'teams',
            creditsRemaining: 300,
          });
        }

        break;
      default:
        console.log(`Unhandled event type ${stripeEvent.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.log('error in stripe webhook: ' + err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export default router;
