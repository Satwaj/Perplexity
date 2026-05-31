import jwt from "jsonwebtoken"


export function authUser(req,res,next){

let token = req.cookies?.token

// Support Authorization header if no cookie
if(!token && req.headers.authorization) {
  const authHeader = req.headers.authorization;
  if(authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  }
}

if(!token){
  return next(); // Proceed without auth for now
}

try {
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

  req.user = decoded
  next()  

} catch (error) {
  console.log("Token verification failed:", error.message);
  return next(); // Proceed without auth for debugging
}

}