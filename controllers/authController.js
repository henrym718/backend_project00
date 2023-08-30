import AuthService from "../services/authService.js";
const authService = new AuthService();

export const register = async (req, res, next) => {
  try {
    //Obtener data
    const token = await authService.register(req.body);

    //Responder al cliente    
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send("success");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //Obtener data
    const token = await authService.login(req.body);

    //Responder al cliente    
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json("success",);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  authService.logout(res)
}
