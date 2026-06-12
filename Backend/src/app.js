import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import chatRouter from "./routes/chat.routes.js"
import battleRouter from "./routes/battle.routes.js"
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import morgan from "morgan"
import config from "dotenv"
import cors from "cors"
import compression from "compression"
import helmet from "helmet"





const app = express()
config.config()

// ======================== PERFORMANCE OPTIMIZATIONS ========================
// Compression middleware - reduces response size by ~70%
app.use(compression())
// Security headers with helmet
app.use(helmet())
// Morgan logging - use 'combined' in production, 'dev' in development
const environment = process.env.NODE_ENV || "development"
app.use(morgan(environment === "production" ? "combined" : "dev"))

// ======================== BODY PARSER & COOKIES ========================
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cookieParser())

// ======================== CORS CONFIGURATION ========================
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://perplexity-bay.vercel.app",
    process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(passport.initialize());

// Dynamic Google OAuth callback URL based on environment
const getGoogleCallbackURL = () => {
    if (environment === "production") {
        return `${process.env.BACKEND_URL}/api/auth/google/callback`
    }
    return "http://localhost:3000/api/auth/google/callback"
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: getGoogleCallbackURL()
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))



app.use("/api/auth", authRouter)
app.use("/api/chats", chatRouter)
app.use("/api/battle", battleRouter)

// ======================== HEALTH CHECK ========================
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() })
})

// ======================== ERROR HANDLING ========================
app.use((err, req, res, next) => {
    console.error("Error:", err.message)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

export default app






