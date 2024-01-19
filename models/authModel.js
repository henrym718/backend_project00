import mongoose from "mongoose"

const authSchema = new mongoose.Schema({
    email: String,
    password: String,
    refreshToken: String
}, {
    timestamps: true,
    versionKey: false
})
const auth = mongoose.model('Auth1', authSchema)

export default auth
