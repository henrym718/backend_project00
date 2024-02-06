import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    displayName: String,
    gender: String,
    city: String,
    aboutMe: String,
    avatar: { uri: String, filename: String },
    phone: String,
    memberSince: { type: Date, default: new Date() },
    rol: String,
}, {
    timestamps: false,
    versionKey: false
})

const user = mongoose.model("User", userSchema)
export default user




