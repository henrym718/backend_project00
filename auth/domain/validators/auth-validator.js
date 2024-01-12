import bcrypt from "bcrypt"

export const comparePasswords = (password_1, password_2) => {
    return bcrypt.compareSync(password_1, password_2)
}

