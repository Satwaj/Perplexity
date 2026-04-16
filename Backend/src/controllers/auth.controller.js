
import usermodel from "../models/user.model.js"
import { authUser } from "../middlewares/auth.middleware.js"
import { sendEmail } from "../services/mail.service.js"
import jwt from "jsonwebtoken"


export async function register(req,res){

  const {email,username,password} = req.body
  const normalizedEmail = email.toLowerCase()

  const isUserAlreadyExists = await usermodel.findOne({
    $or:[{email: normalizedEmail},{username}]
  })

  if(isUserAlreadyExists){
    return res.status(400).json({
  
      success:false,
      message:"User with this Email Address Already Exists",
      err:"user already exists"
    })
  }

  const user = await usermodel.create({
    email: normalizedEmail,
    username,
    password
  })

  const emailVerificationToken = jwt.sign(
    {email:user.email},
    process.env.JWT_SECRET_KEY,
    {expiresIn:"1d"}
  ) 

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function login(req,res){

  const {email,password} = req.body

  const user = await usermodel.findOne({email: email.toLowerCase()})

  if(!user){
    return res.status(400).json({
      message:"Invalid credentials",
      success:false,
      err:"User not found"
    })
  }

  if(!user.verified){
    return res.status(400).json({
      message:"Email not verified",
      success:false,
      err:"Please verify your email before logging in"
    })
  }

  const isPasswordValid = await user.comparePassword(password)

  if(!isPasswordValid){
    return res.status(400).json({
      message:"Invalid credentials",
      success:false,
      err:"Incorrect password"
    })
  }

  const token = jwt.sign(
    {id:user._id,email:user.email},
    process.env.JWT_SECRET_KEY,
    {expiresIn:"7d"}
  )

  res.cookie("token", token)

  res.status(200).json({
    message: "Login successful",
    success: true,
    token: token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })

}


export async function getMe(req,res){
  const userId = req.user.id

  const user = await usermodel.findById(userId).select("-password")

  if(!user){
    return res.status(404).json({
      message:"User not found",
      success:false,
      err:"User not found"
    })
  }

  res.status(200).json({
    message: "User found",
    success: true,
    user: user
  })


}





export async function verifyEmail(req,res){

  const{token} = req.query

try{
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

  const user = await usermodel.findOne(
    {email: decoded.email.toLowerCase()}
  )

  if(!user){
    return res.status(400).json({
      message:"Invalid token",
      success:false,
      err:"User not found"
    })
  }

  user.verified = true

  await user.save()

  const html = `
    <h1>Email Verified Successfully</h1>
    <p>Your email has been verified. You can now log in to your account.</p>
    <a href='http://localhost:3000/login'>Go to Login</a>
  `
  return res.send(html);
}
catch(error){
  return res.status(400).json({
    message:"Invalid or Expired Token",
    success:false,
    err:error.message
  })
}
} 


