import jwt from "jsonwebtoken"


export function authUser(req,res,next){

const token = req.cookies?.token

if(!token){
  return res.status(401).json({
    success:false,
    message:"Unauthorized Access",
    err:"No token provided"
  })
}

try {
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

  req.user = decoded

  next()  

} catch (error) {

  return res.status(401).json({
    success:false,
    message:"Unauthorized Access",
    err:"Invalid token"

  })  

}

}