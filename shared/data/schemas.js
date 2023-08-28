import joi from "joi";

const name = joi.string();
const lastName = joi.string();
const email = joi.string().email();
const password = joi.string().pattern(new RegExp("^.{8,}$"));
const repeatPassword = joi.any().valid(joi.ref("password"));
const avatar = joi.string();
const isSeller = joi.boolean().default(false);

export const userSchema = joi.object({
  email: email.required(),
  password: password.required(),
  repeatPassword: repeatPassword.required()
});

export const loginSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

const currencyRegex = /^\$\d{1,3}(,\d{3})*\.\d{2}$/;
const service = joi.string();
const counter = joi.number();
const images = joi.array();
const aboutService = joi.string();
const aboutMe = joi.string();
const features = joi.string();
const price = joi.number();
const subcategory = joi.string();
const phone = joi.string();
const address = joi.string();
const active = joi.boolean().default(true);

export const gigSchema = joi.object({
  service: service.required(),
  counter: counter.optional(),
  images: images.optional(),
  aboutService: aboutService.required(),
  aboutMe: aboutMe.required(),
  features: features.required(),
  price: price.required(),
  subcategory: subcategory.required(),
  phone: phone.required(),
  address: address.required(),
  active: active.optional(),
});
