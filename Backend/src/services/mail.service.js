import nodemailer from "nodemailer"

const requiredMailEnv = [
  "GOOGLE_USER",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN",
]

const missingMailEnv = requiredMailEnv.filter((name) => !process.env[name])

if (missingMailEnv.length > 0) {
  throw new Error(`Missing mail config env vars: ${missingMailEnv.join(", ")}`)
}

const transporter = nodemailer.createTransport({
  
   service:"gmail",
   auth:{

    type: 'OAuth2',
    user:process.env.GOOGLE_USER,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
    clientId:process.env.GOOGLE_CLIENT_ID

   }

})

transporter.verify()
 .then(()=>{
    console.log("Email Server is ready to take messages")
 })
  .catch((err)=>{
    console.log("Error connecting to email server",err)
  })

  export async function sendEmail({to,subject,html,text}){


    const mailOptions = {
      from:process.env.GOOGLE_USER,
      to,
      subject,
      html,
      text
    }

     const details = await transporter.sendMail(mailOptions)
     console.log("Email sent successfully",details)
  }
 

  