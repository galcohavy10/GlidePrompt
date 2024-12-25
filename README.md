# GlidePrompt

GlidePrompt is a full-stack application that simplifies prompt engineering and testing across multiple LLMs (Language Model APIs). It helps you:

- Compare outputs from different providers (OpenAI, Anthropic, Replicate, Google Gemini).
- Manage subscriptions and billing via Stripe.
- Collect insights in one place.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [High-Level Architecture](#high-level-architecture)  
3. [Folder Structure](#folder-structure)  
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Environment Variables](#environment-variables)
   - [Installation & Setup](#installation--setup)
5. [Available Scripts](#available-scripts)
6. [Features](#features)
   - [LLM Prompt Comparison](#llm-prompt-comparison)
   - [Billing & Subscriptions](#billing--subscriptions)
   - [Email Subscription](#email-subscription)
7. [Project Flow](#project-flow)

---

## Project Overview

**GlidePrompt** is designed to be a user-friendly prompt-engineering lab and subscription-based platform. It allows you to:

- Send prompts to various LLM endpoints (Anthropic’s Claude, OpenAI’s GPT, Replicate-based models, and Google’s Gemini).
- Easily analyze and compare model responses from a single interface.
- Integrate Stripe for subscription management (Pro, Teams, etc.).
- Keep track of user data and subscriptions via Firebase.

---

## High-Level Architecture

Below is a simplified diagram illustrating the main components (derived from the code structure):

    ┌─────────────────────┐       ┌────────────────────────┐
    │  Frontend (React)   │  -->  │  Express Server (Node) │
    │ (src/frontend)      │       │  (src/backend)         │
    └─────────────────────┘       └────────────────────────┘
             |
             | (API calls)
             v
    ┌────────────────────────────────┐
    │  LLM APIs (OpenAI, Anthropic, │
    │      Replicate, Google)       │
    └────────────────────────────────┘
             |
             | (Payment & Plans)
             v
    ┌────────────────────────────────┐
    │           Stripe              │
    └────────────────────────────────┘
             |
             | (User Data)
             v
    ┌────────────────────────────────┐
    │        Firebase (Auth, DB)    │
    └────────────────────────────────┘

1. **React Frontend** – Provides a prompt playground & subscription UI.  
2. **Express Backend** – Contains endpoints for chat requests, subscription handling, and more.  
3. **LLM APIs** – External large language model providers (Anthropic, OpenAI, etc.).  
4. **Stripe** – Manages subscription plans and billing.  
5. **Firebase** – Authenticates users, stores user data, and subscription statuses.

---

## Folder Structure

    glideprompt/
    ├── package.json
    ├── src
    │   ├── backend
    │   │   ├── controllers
    │   │   │   ├── chatWithClaude.js
    │   │   │   ├── chatWithOpenAI.js
    │   │   │   ├── chatWithReplicate.js
    │   │   │   ├── chatWithGemini.js
    │   │   │   └── subscribeEmail.js
    │   │   ├── routes
    │   │   │   └── webhookRoutes.js
    │   │   ├── firebase.js
    │   │   ├── firebaseAdmin.js
    │   │   └── index.js        // Entry point for the Express server
    │   └── frontend
    │       ├── public
    │       ├── src
    │       │   ├── App.js
    │       │   ├── components
    │       │   ├── firebase.js // Frontend Firebase initialization
    │       │   ├── ...         // Additional React components
    │       └── package.json
    ├── .env.sample
    └── ...

- **`src/backend`**: Contains the Express server, controllers for handling logic, routes, and Firebase initialization.  
- **`src/frontend`**: Contains the React application (create-react-app structure).

---

## Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (or Yarn)
- A **Stripe** account (test or live)
- A **Firebase** project (for Auth & Firestore)

### Environment Variables

Copy or rename `.env.sample` to `.env`. Fill in:

    REACT_APP_API_URL=http://localhost:5000

    REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    REACT_APP_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT
    REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
    REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID

    REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST=YOUR_STRIPE_PUBLISHABLE_KEY_TEST
    REACT_APP_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY

For backend (same `.env` or separate if preferred):

    STRIPE_TEST_KEY=YOUR_STRIPE_TEST_KEY
    STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY

---

### Installation & Setup

1. **Install dependencies** (root-level):
       npm install

   Then install frontend dependencies:
       cd src/frontend
       npm install
       cd ../..

2. **Configure Firebase**  
   Edit `src/frontend/src/firebase.js` and `src/backend/firebase.js` with your Firebase project details.

3. **Configure Stripe**  
   Ensure your Stripe keys are set in `.env`.

---

## Available Scripts

From the top-level `package.json`:

    {
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node src/backend/index.js",
        "start-dev": "concurrently \"cd src/frontend && npm run start\" \"cd src/backend && npm run start\"",
        "start-prod": "cd src/frontend && npm run build && cd ../../ && node src/backend/index.js"
      }
    }

| Script         | Command                                  | Description                                                                     |
|----------------|------------------------------------------|---------------------------------------------------------------------------------|
| **start**      | npm run start                            | Runs the backend server (`src/backend/index.js`).                               |
| **start-dev**  | npm run start-dev                        | Runs both frontend (React) and backend (Express) in development mode.          |
| **start-prod** | npm run start-prod                       | Builds the frontend for production and then starts the backend server.         |

- **Development**:  
  `npm run start-dev` – React dev server on port 3000, Express on port 5000.
- **Production**:  
  `npm run start-prod` – Builds React in `frontend/build`, then runs Express.

---

## Features

### LLM Prompt Comparison

- **Endpoint**: `POST /chatWithAI`
- You send `{ company, modelName, messages, systemMessage }`.
- The backend calls the relevant function (`chatWithClaude.js`, etc.).
- Returns the response to display on the frontend.

### Billing & Subscriptions

- **Create Checkout**: `POST /createCheckoutSession` (Sets up Stripe checkout for selected plan: pro, teams, etc.).
- **Cancel Subscription**: `POST /cancelSubscription` (Sets `cancel_at_period_end` to `true`, updates Firestore accordingly).

### Email Subscription

- **Subscribe**: `POST /subscribeEmail` (Adds email to mailing list via Mailchimp or other services).

---

## Project Flow

1. User visits GlidePrompt.  
2. Frontend loads; user logs in (Firebase) or tries the demo.  
3. If using the prompt playground:
   - User sends a prompt to the chosen LLM provider.
   - Backend calls the corresponding LLM API.
   - Response is returned to the frontend.
4. If upgrading subscription:
   - User chooses a plan (Pro or Teams).
   - Backend creates Stripe checkout session.
   - After successful payment, user is redirected back.
   - Firebase updates the user’s subscription status.
5. `express-rate-limit` is applied to `chatWithAI` to limit usage.

Diagrammatically:

    Frontend (React) --> Express --> LLM (Anthropic, OpenAI, etc.)
                               --> Stripe (Payment)
                               --> Firebase (Auth & DB)
