import { Schema, model } from "mongoose"

const productSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    category: String,
    subcategory: String,
    tags: [String],
    price: { type: Number, default: 0 },
    aboutGig: String,
    phone: String,
    faq: [{ question: String, answer: String }],
    coverImage: String,
    counter: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
}, {
    timestamps: false,
    versionKey: false
})
const productModel = model("Product", productSchema)

export default productModel 