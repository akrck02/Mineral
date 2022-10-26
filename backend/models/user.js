import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String
    },
    validated: {
        type: Boolean, 
        default: false
    }
},
{
    timestamp: true
});


userSchema.pre('save', async function(next) {

    if(!this.isModified('password')) {
        next();
    }


    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

userSchema.methods.checkPassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm,this.password);
}

export default User;