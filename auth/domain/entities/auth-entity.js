class Auth {
    constructor(email, password) {
        this._id = null
        this.email = email;
        this.password = password;
        this.refreshToken = null;
    }
    setRefreshToken(token) {
        this.refreshToken = token;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRefreshToken() {
        return this.refreshToken;
    }
}
export default Auth