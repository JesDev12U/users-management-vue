import errors from "../middlewares/errors.js";
import db from "../db/db.js";

export default {
  init: (req, res) => res.json({ error: false, message: "Correct!" }),
  getAllData: async (req, res) => {
    try {
      let idUser = req.idUser;
      if (!idUser) throw { message: "idUser is not defined" };
      let results = await db.query("SELECT * FROM users WHERE id = ?", [
        idUser,
      ]);

      res.json({
        error: false,
        message: results[0][0],
      });
    } catch (err) {
      console.error(err);
      errors.e500(req, res, err.message);
    }
  },
};
