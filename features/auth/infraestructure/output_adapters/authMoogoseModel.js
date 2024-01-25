import { Schema, model } from "mongoose"

const authSchema = new Schema({
    email: String,
    password: String,
    refreshToken: String
}, {
    timestamps: true,
    versionKey: false
})

const authModel = model('Auth', authSchema)
export default authModel
