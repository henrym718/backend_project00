import AuthService from "../services/authService.js";
const authService = new AuthService();

export const register = async (req, res, next) => {
  try {
    const { token, user } = await authService.register(req.body);

    //Responder al cliente
    const { password: any, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(info);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //Obtener data
    const { token, user } = await authService.login(req.body);

    //Responder al cliente
    const { password: any, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(info);
  } catch (err) {
    next(err);
  }
};
