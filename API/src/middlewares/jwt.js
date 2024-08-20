import errors from "./errors.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_KEY;

export default {
  verifyToken: (req, res, next) => {
    let authorization = req.headers["authorization"];
    let token = authorization && authorization.split(" ")[1];

    if (!token) return errors.e400(req, res, "Token not provided");

    jwt.verify(token, SECRET_KEY, (error, user) => {
      if (error)
        return res.status(400).json({
          error: true,
          message: "Invalid or expired token",
          errorStr: "INVALID_TOKEN",
        });
      req.idUser = user.idUser;
      next();
    });
  },
  refreshToken: (req, res) => {
    let authorization = req.headers["authorization"];
    let token = authorization && authorization.split(" ")[1];

    if (!token) return errors.e400(req, res, "Token not provided");

    jwt.verify(token, SECRET_KEY, (error, user) => {
      if (error) return errors.e400(req, res, "Invalid token");
      let newAccessToken = jwt.sign({ idUser: user.idUser }, SECRET_KEY, {
        expiresIn: "15m",
      });

      res.json({
        error: false,
        message: "New Access Token successfully generated",
        newAccessToken,
      });
    });
  },
};
