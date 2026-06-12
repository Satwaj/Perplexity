import mongoose from "mongoose"
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema( {
        username: {
            type: String,
            required: false,
            trim: true,
            sparse: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: false,
            minlength: 6,
        },
        googleId: {
            type: String,
            sparse: true,
        },
        verified: {
            type: Boolean,
            default: true,
        },
        fullname: {
            type: String,
            trim: true,
        },
        profilePic: {
            type: String,
        },
    },

    { timestamps: true } 
  )

 userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};



const userModel = mongoose.model("User", userSchema)

export default userModel