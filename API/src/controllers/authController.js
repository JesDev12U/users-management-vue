import errors from "../middlewares/errors.js";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_KEY;

export default {
  init: (req, res) => res.json({ error: false, message: "Correct!" }),
  signin: async (req, res) => {
    try {
      console.log(req.body);
      let { name, cellphone, curp, born_date, email, password } = req.body;
      if (!name || !cellphone || !curp || !born_date || !email || !password)
        return errors.e400(req, res, "Send correctly the user data");

      let results = await db.query(
        "SELECT * FROM users WHERE cellphone = ? OR curp = ? OR email = ?",
        [cellphone, curp, email]
      );

      if (results[0].length !== 0)
        return errors.e403(req, res, "The user already exists");

      let hash = await bcrypt.hash(password, 10);

      await db.query("INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", [
        name,
        cellphone,
        curp,
        born_date,
        email,
        hash,
      ]);

      res.json({
        error: false,
        message: "The user has successfully registered",
      });
    } catch (err) {
      console.error(err);
      errors.e500(req, res, err.message);
    }
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      if (!email || !password)
        return errors.e403(req, res, "Send correctly email and password");

      let results = await db.query(
        "SELECT id, password FROM users WHERE email = ?",
        [email]
      );

      if (results[0].length === 0)
        return errors.e404(
          req,
          res,
          `The user with ${email} email does not exists`
        );

      let isMatch = await bcrypt.compare(password, results[0][0].password);

      if (!isMatch) return errors.e403(req, res, "Invalid password");

      let accessToken = jwt.sign({ idUser: results[0][0].id }, SECRET_KEY, {
        expiresIn: "1m",
      });
      let refreshToken = jwt.sign({ idUser: results[0][0].id }, SECRET_KEY, {
        expiresIn: "2m",
      });

      res.json({
        error: false,
        message: "Correct Login!",
        accessToken,
        refreshToken,
      });
    } catch (err) {
      console.error(err);
      errors.e500(req, res, err.message);
    }
  },
};
