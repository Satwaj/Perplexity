
import usermodel from "../models/user.model.js"
import { authUser } from "../middlewares/auth.middleware.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import config from "dotenv"
config.config()


export async function register(req,res){
  try {
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
      password,
      verified: true
    })

    const token = jwt.sign(
      {id:user._id,email:user.email},
      process.env.JWT_SECRET_KEY,
      {expiresIn:"7d"}
    )

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        token: token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      err: error.message
    })
  }
}

export async function login(req,res){
  try {
    const {email,password} = req.body

    const trimmedInput = email.trim();
    const user = await usermodel.findOne({
      $or: [
        { email: trimmedInput.toLowerCase() },
        { username: trimmedInput }
      ]
    });

    if(!user){
      return res.status(400).json({
        message:"Invalid credentials",
        success:false,
        err:"User not found"
      });
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
        username: user.username || user.fullname || "User",
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      err: error.message
    })
  }
}


export async function getMe(req,res){
  if(!req.user){
    return res.status(401).json({
      message:"Not authenticated",
      success:false,
      err:"No user found"
    })
  }

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

export async function logout(req,res){
  try {
    // With JWT, logout is handled client-side by removing the token
    // This endpoint exists for consistency and can be extended for token blacklisting if needed
    res.status(200).json({
      message: "Logged out successfully",
      success: true
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      err: error.message
    })
  }
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

// export async function logout(req,res){
//   res.clearCookie("token")
//   res.status(200).json({
//     message:"Logout successful",
//     success:true
//   })
// }

export const googleCallback = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect("http://localhost:5173/login?error=GoogleAuthFailed");
        }

        const { id, displayName, emails, photos } = req.user;
        const email = emails?.[0]?.value;

        if (!email) {
            return res.redirect("http://localhost:5173/login?error=NoEmailFromGoogle");
        }

        const normalizedEmail = email.toLowerCase();
        const profilePic = photos?.[0]?.value || "";

        let user = await usermodel.findOne({ email: normalizedEmail });

        if (!user) {
            user = await usermodel.create({
                email: normalizedEmail,
                googleId: id,
                fullname: displayName,
                username: displayName.replace(/\s+/g, "_").toLowerCase() + "_" + Date.now(),
                verified: true,
                profilePic
            });
        } else if (!user.googleId) {
            user.googleId = id;
            user.fullname = displayName;
            user.profilePic = profilePic;
            await user.save();
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.cookie("token", token);

        res.redirect(`http://localhost:5173/?token=${token}&userId=${user._id}`);
    } catch (error) {
        res.redirect(`http://localhost:5173/login?error=${encodeURIComponent(error.message)}`);
    }
}

