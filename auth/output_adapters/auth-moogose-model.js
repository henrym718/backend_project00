import { Schema, model } from "mongoose"

const authSchema = new Schema({
    email: String,
    password: String,
    refreshToken: String
}, {
    timestamps: true,
    versionKey: false
})

const auth = model('Auth', authSchema)
export default auth
