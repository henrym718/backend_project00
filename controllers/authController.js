import Login from '../services/auth/login.js';
import Register from "../services/auth/register.js"
import Logout from './../services/auth/logout.js';

/** inicializar los servivios */
const loginService = new Login();
const registerService = new Register();
const logoutService = new Logout();


/** controladores con sus servicios */
export const register = async (req, res, next) => {
  try {
    //Obtener data
    const { accessToken, refreshToken } = await registerService.execute(req.body);
    //Responder al cliente    

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000, })
    res.status(200).send({ error: false, token: accessToken });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    /** Obtener data */
    const { accessToken, refreshToken } = await loginService.execute(req.body);

    /** Responder al cliente */
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).send({ error: false, accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    await logoutService.execute(req, res)
  } catch (err) {
    next(err);
  }
}
