# LearnifyAI

LearnifyAI is an AI-powered learning assistant that helps users generate comprehensive course roadmaps and quick notes for any topic. The system leverages generative AI to create structured modules, lesson plans, and concise notes, making learning efficient and personalized.

## Features

- **User Authentication:** Register and login securely.
- **Quick Notes:** Instantly generate concise, clear notes for any topic.
- **Modules:** Create step-by-step, difficulty-based modules with multiple topics and lessons.
- **AI-Generated Content:** Uses Google Gemini API for generating educational content.
- **Dashboard:** View and manage your notes and modules.
- **Modern UI:** Built with React, Tailwind CSS, and Vite for a fast, responsive experience.

## Tech Stack

- **Frontend:** React, Redux Toolkit, RTK Query, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **AI Integration:** Google Generative AI (Gemini API)
- **Authentication:** JWT

## Folder Structure

```
learnifyai/
  backend/
    src/
      controllers/
      models/
      routes/
      services/
      middlewares/
      config/
      server.js
    package.json
  frontend/
    src/
      app/
      components/
      features/
      pages/
      assets/
      main.jsx
      App.jsx
    public/
    package.json
    vite.config.js
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB
- Google Gemini API Key

### Backend Setup

1. Navigate to the backend folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the backend server:
   ```
   npm run backend
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm run dev
   ```

### Usage

- Register or login to your account.
- Use the dashboard to generate quick notes or modules for any topic.
- View, manage, and explore your learning content.

## API Endpoints

### Backend

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login
- `POST /api/topics/topicNotes` - Generate quick notes
- `GET /api/topics/getNotes` - Get all quick notes
- `POST /api/modules/generate` - Generate a new module
- `GET /api/modules/getAll` - Get all modules for the user

