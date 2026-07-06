import { Router } from "express"
import {  register,login,getMe,logout,verifyEmail , googleCallback} from "../controllers/auth.controller.js"
import { registerValidator, loginValidator } from "../validators/auth.validator.js"
import { authUser } from "../middlewares/auth.middleware.js"
import passport from "passport"
import dotenv from "dotenv"
import config from "dotenv"

const authRouter = Router()
config.config()


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, register)

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body { email, password }
 */
authRouter.post("/login", loginValidator, login)

/** 
 * @route GET /api/auth/get-me
 * @desc Get current logged in user's info
 * @access Private
 * @header { Authorization: "Bearer <token>" }
 */
authRouter.get("/get-me", authUser, getMe)

/**
 * @route POST /api/auth/logout
 * @desc Logout user (clear token on client side)
 * @access Private
 * @header { Authorization: "Bearer <token>" }
 */
authRouter.post("/logout", authUser, logout)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */
authRouter.get("/verify-email", verifyEmail)

/**
 * @route GET /api/auth/google
 * @desc Initialize Google OAuth authentication
 * @access Public
 */
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

/**
 * @route GET /api/auth/google/callback
 * @desc Google OAuth callback
 * @access Public
 */
authRouter.get("/google/callback", (req, res, next) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  passport.authenticate("google", {
    failureRedirect: `${frontendUrl}/login?error=GoogleAuthFailed`,
    session: false
  })(req, res, next);
}, googleCallback)

export default authRouter
