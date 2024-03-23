class UserEntity {
    constructor(email, firstName, lastName, displayName, gender, city, sector, aboutMe, avatar, dateOfBirth, levelOfEducation, phone, profession, memberSince, rol) {
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.displayName = displayName
        this.gender = gender
        this.city = city
        this.sector = sector
        this.aboutMe = aboutMe
        this.avatar = avatar
        this.dateOfBirth = dateOfBirth
        this.levelOfEducation = levelOfEducation
        this.profession = profession
        this.memberSince = memberSince
        this.rol = rol
        this.phone = phone
    }
}

export default UserEntity