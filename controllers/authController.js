import AuthService from "../services/authService.js";
const authService = new AuthService();

export const register = async (req, res, next) => {
  try {
    //Obtener data
    const { accessToken, refreshToken } = await authService.register(req.body);
    //Responder al cliente    
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000, })
    res.status(200).send({ error: false, token: accessToken });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //Obtener data
    const { accessToken, refreshToken } = await authService.login(req.body);

    //Responder al cliente    
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000, })
    res.status(200).send({ error: false, token: accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  authService.logout(res)
}
