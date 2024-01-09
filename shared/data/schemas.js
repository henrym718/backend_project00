import joi from "joi";


/*  auth */
const email = joi.string().email();
const password = joi.string().pattern(new RegExp("^.{8,}$"));
const repeatPassword = joi.any().valid(joi.ref("password"));
const refreshToken = joi.string()

/*  seller profile */
const firstName = joi.string();
const lastName = joi.string();
const displayName = joi.string().label("username")
const aboutMe = joi.string()
const city = joi.string()
const phone = joi.string();

/* gig */
const title = joi.string();
const category = joi.string();
const subcategory = joi.string();
const tags = joi.string()
const price = joi.number();
const aboutGig = joi.string();
const faq = joi.string();

/* subcategory */
const name = joi.string()


export const authSchema = joi.object({
  email: email.required(),
  password: password.required(),
  repeatPassword: repeatPassword.required(),
  refreshToken: refreshToken.optional(),
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

})

export const createSubcategorySchema = joi.object({
  name: name.required(),
  category: category.required(),

})


export const gigSchema = joi.object({
  title: title.required(),
  category: category.required(),
  subcategory: subcategory.required(),
  tags: tags.required(),
  city: city.required(),
  price: price.required(),
  aboutGig: aboutGig.required(),
  phone: phone.required(),
  faq: faq.required(),
});
