class Auth {
    constructor(email, password) {
        this._id = null
        this.email = email
        this.password = password
        this.refreshToken = null
        this.accessToken = null
    }
    setRefreshToken(token) {
        this.refreshToken = token
    }
    setAccessToken(token) {
        this.accessToken = token
    }

    setId(id) {
        this._id = id
    }

    getId() {
        return this._id
    }

    getEmail() {
        return this.email.toLowerCase()
    }

    getPassword() {
        return this.password
    }

    getRefreshToken() {
        return this.refreshToken
    }
    getAccessToken() {
        return this.accessToken
    }
}
export default Auth