import joi from "joi";


/*  auth */
const email = joi.string().email();
const password = joi.string().pattern(new RegExp("^.{8,}$"));
const repeatPassword = joi.any().valid(joi.ref("password"));

/*  seller profile */
const firstName = joi.string();
const lastName = joi.string();
const displayName = joi.string().label("username")
const aboutMe = joi.string()
const city = joi.string()
const phone = joi.string();

/* gig */
const service = joi.string();
const counter = joi.number();
const images = joi.array();
const aboutService = joi.string();
const features = joi.string();
const price = joi.number();
const subcategory = joi.string();
const active = joi.boolean().default(true);



export const authSchema = joi.object({
  email: email.required(),
  password: password.required(),
  repeatPassword: repeatPassword.required()
});

export const loginSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

export const sellerProfileSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  displayName: displayName.required(),
  aboutMe: aboutMe.required(),
  city: city.required(),
  phone: phone.required()
})

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
  active: active.optional(),
});
