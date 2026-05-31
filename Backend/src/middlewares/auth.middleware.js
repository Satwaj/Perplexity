import jwt from "jsonwebtoken"


export function authUser(req,res,next){

let token = req.cookies?.token

console.log("Auth check - cookies token:", !!token);
console.log("Authorization header:", req.headers.authorization?.substring(0, 20) + "...");

// Support Authorization header if no cookie
if(!token && req.headers.authorization) {
  const authHeader = req.headers.authorization;
  if(authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);
    console.log("Token extracted from header");
  }
}

if(!token){
  console.log("No token found - proceeding without auth");
  return next(); // Proceed without auth for now
}

try {
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

  req.user = decoded
  console.log("Token verified successfully");

  next()  

} catch (error) {
  console.log("Token verification failed:", error.message);
  return next(); // Proceed without auth for debugging
}

}