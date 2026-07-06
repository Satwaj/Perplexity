# Resume Guide: Arena AI

Here is a curated guide of technical highlights and bullet points for the **Arena AI (LLM Benchmark Hub & Chat Platform)** project that you can add directly to your resume.

---

## 🛠️ Technology Stack
*   **Frontend:** React.js, Redux Toolkit, GSAP (GreenSock Animation Platform), Tailwind CSS, HTML5, CSS3.
*   **Backend:** Node.js, Express, Socket.io (WebSockets), MongoDB, Mongoose, JSON Web Tokens (JWT).
*   **AI & APIs:** Groq API, Mistral AI API, Gemini API, Web Speech API (Text-to-Speech).
*   **Deployment:** Vercel (Frontend), Railway (Backend).

---

## 📄 Resume Bullet Points (STAR / Google XYZ Format)

### Option A: Full-Stack focus (Recommended)
*   **Architected and developed Arena AI**, a full-stack, real-time LLM benchmarking and multi-agent chat platform integrating Mistral, Groq, and Gemini models.
*   **Designed and built a dual-model battle arena** that triggers simultaneous, asynchronous API queries to multiple LLM endpoints, side-by-side solutions rendering, and automated judge verdicts evaluating reasoning outputs.
*   **Implemented a persistent, real-time message streaming pipeline** using **Socket.io** and **Redux Toolkit**, reducing message-to-render latency and maintaining synchronization across browser states.
*   **Engineered an immersive motion design system** using **GSAP** and **Tailwind CSS**, featuring interactive cursor-movement parallax grids, floating background elements, and staggered layout transitions.
*   **Secured the application's authentication flow** by implementing custom JWT-based authentication, user registry gateways, protected routes, and CORS middleware authorized for distributed production domains (Vercel & Railway).
*   **Integrated Web Speech API** to construct an interactive vector-icon text-to-speech audio reader, supporting user-controlled assistant playback states.

### Option B: Frontend & UX focus
*   **Engineered a premium, highly-responsive Neobrutalist design system** utilizing Tailwind CSS and Outfit typography, delivering high-contrast layouts and consistent dark/light paper interfaces.
*   **Developed high-fidelity, staggered layout animations** with **GSAP**, resulting in fluid, physics-based slide/fade entrances for hero sections, pricing tiers, and active chat windows.
*   **Built an interactive background parallax layer** that captures real-time cursor offsets to dynamically drift vector geometric shapes, enhancing user engagement and micro-interactions.
*   **Created slice-based global state hierarchies** using **Redux Toolkit** to manage user sessions, model benchmarking states, and persistent chat lists across route navigation.
*   **Optimized production bundle size and assets delivery** via Vite bundler configurations, compiling 430+ modules into highly compressed assets yielding quick load times.

---

## 💡 Key Architectural Details (For Interviews)
Be prepared to talk about these features in your technical interviews:
1.  **Concurrency**: Discuss how the **Battle Arena** queries multiple LLM providers concurrently (asynchronously) using Node.js backplane services, formatting and feeding response streams to the user concurrently.
2.  **State Synchronization**: Explain how you managed the chat messages lists—storing them inside a MongoDB database, caching them inside Redux state on load, and updating active rooms via socket channels.
3.  **Authentication Hooks**: Talk about using custom React hooks (`useAuth`) and protected route wrapper components to safeguard private chat rooms while keeping pricing and the battle arena publicly accessible.
