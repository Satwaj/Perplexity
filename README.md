#  Blinkly AI

Blinkly AI is a full-stack AI platform that combines conversational AI, real-time web search, and a multi-model AI Battle Arena into a single application.

The platform allows users to chat with AI, access real-time information from the web, and compare responses from multiple AI models through an AI-powered evaluation system.

---

## ✨ Features

### AI Chat

* Intelligent AI-powered conversations
* Real-time responses
* Chat history management
* Persistent conversations

### Authentication

* Secure JWT Authentication
* Protected Routes
* Session Management
* User-specific chat history

### AI Battle Arena

* Compare responses from multiple AI models
* Multi-agent workflow using LangGraph
* AI-generated scoring and evaluation
* Automatic winner selection

### Web Search

* Real-time web search using Tavily
* Up-to-date information retrieval
* Search-enhanced responses

### Responsive Design

* Desktop-friendly interface
* Mobile responsive UI
* Modern user experience

---

## 🏗️ Architecture

User → React Frontend → Express Backend → LangGraph Workflow → AI Models → Response Evaluation → Final Result

### Arena Flow

User Prompt

↓

Mistral AI Response

↓

Groq AI Response

↓

Gemini AI Judge

↓

Scores & Evaluation

↓

Winner Selection

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Socket.io

### AI Stack

* LangChain
* LangGraph
* Gemini
* Groq
* Mistral
* Tavily Search

### Authentication

* JWT
* Cookies
* bcryptjs

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas

---

## 📂 Project Structure

Frontend

```bash
src/
├── components/
├── features/
│   ├── auth/
│   ├── chat/
│   ├── battle/
│   └── pricing/
├── redux/
├── hooks/
├── routes/
└── utils/
```

Backend

```bash
src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── services/
├── socket/
└── config/
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone <repository-url>
cd blinkly
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Backend

```env
PORT=3000

MONGODB_URI=

JWT_SECRET=

GEMINI_API_KEY=

GROQ_API_KEY=

MISTRAL_API_KEY=

TAVILY_API_KEY=
```

Frontend

```env
VITE_API_URL=
```

---

## 🎯 Problem Statement

Most AI applications rely on a single AI model, which may not always provide the best answer.

Blinkly AI solves this by:

* Comparing responses from multiple AI models
* Using AI-based evaluation and scoring
* Integrating real-time web search
* Providing a transparent answer-selection process

---

## 📚 What I Learned

* Full-Stack Development
* AI Application Architecture
* LangGraph Workflows
* Multi-Agent Systems
* Authentication & Authorization
* State Management with Redux
* Production Deployment
* Session Restoration
* API Integration
* Real-World Debugging

---

## 🔮 Future Enhancements

* Image Understanding
* PDF Upload & RAG
* Document Chat
* Voice Interaction
* Advanced Multi-Agent Workflows

---

## 👨‍💻 Author

**Satwaj Bachhav**

Built with curiosity, persistence, and a passion for learning modern AI application development.

---

