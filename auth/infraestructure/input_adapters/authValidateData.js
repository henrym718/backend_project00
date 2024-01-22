import joi from "joi"


const email = joi.string().email({ tlds: { allow: ["es", "com"] } }).messages({
    "string.email": "El email ingresado no es valido"
})
const password = joi.string().pattern(new RegExp("^.{8,}$")).messages({
    "string.pattern.base": "El formato de la contraseña es incorrecta"
})
const repeatPassword = joi.any().valid(joi.ref("password")).messages({
    "any.only": "Las contraseñas no coinciden "
})

export const authDataValidateLogin = joi.object({
    email: email.required(),
    password: password.required()
})

export const authDataValidateRegister = joi.object({
    email: email.required(),
    password: password.required(),
    repeatPassword: repeatPassword.required()
})



