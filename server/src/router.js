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
    return res.json({ log: false, message: "No token" });
  } else {
    jwt.verify(token, mySecretCode, (err, data) => {
      if (err) return res.json({ log: false, message: "Token error" });
      req.userID = data;
      next();
    });
  }
};

router.get("/", verify, async (req, res) => {
  try {
    (await db)
      .query("SELECT id,name,email FROM users WHERE id = ?", [req.userID.id])
      .then((ms) => res.json({ log: true, userInfo: ms[0] }));
  } catch (error) {
    res.json({ log: false, message: "Server error" });
  }
});

export default router;
