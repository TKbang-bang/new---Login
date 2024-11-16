import express from "express";
import db from "./database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const mySecretCode = crypto.randomUUID();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const id = crypto.randomUUID();

  try {
    const myReq = (await db)
      .query("SELECT * FROM users WHERE email = ?", [email])
      .then(async (data) => {
        if (data[0] < 1) {
          const newPassword = await bcrypt.hash(password, 10);
          const myInsert = (await db).query(
            "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
            [id, name, email, newPassword]
          );
          myInsert.then((ms) => {
            if (ms[0].affectedRows == 1) {
              const token = jwt.sign({ id }, mySecretCode, {
                expiresIn: "1h",
              });
              res.json(token);
            }
          });
        } else {
          return res.json({ message: "User already exist" });
        }
      });
  } catch (error) {
    console.log(error);
  }
});

const verify = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.json("No token");
  } else {
    jwt.verify(token, mySecretCode, (err, data) => {
      if (err) return res.json("Error token");
      req.userID = data;
      next();
    });
  }
};

router.get("/", verify, async (req, res) => {
  try {
    const myReq = (await db)
      .query("SELECT * FROM users WHERE id = ?", [req.userID.id])
      .then((ms) => console.log(ms));
  } catch (error) {
    console.log(error);
  }
});

export default router;
