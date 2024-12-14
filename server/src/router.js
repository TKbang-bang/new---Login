const express = require("express");
const db = require("./database/db.js");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/verify", (req, res) => {
  if (req.session.userID) {
    res.json({ log: true });
  } else {
    res.json({ log: false });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const id = crypto.randomUUID();

    const [getUsers] = await (
      await db
    ).query("SELECT * FROM users WHERE email = ?", [email]);

    if (getUsers.length < 1) {
      const newPassword = await bcrypt.hash(password, 10);

      const [userInsert] = await (
        await db
      ).query(
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
        [id, name, email, newPassword]
      );

      if (userInsert.affectedRows < 1) {
        res.json({ log: false, message: "Try again" });
      } else {
        req.session.userID = id;
        res.json({ log: true, message: "User added" });
      }
    } else {
      res.json({ log: false, message: "User already exist" });
    }
  } catch (error) {
    res.json({ log: false, message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [userCheck] = await (
      await db
    ).query("SELECT * FROM users WHERE email = ?", [email]);

    if (userCheck.length < 1) {
      res.json({ log: false, message: "User does not exist" });
    } else {
      bcrypt.compare(password, userCheck[0].password, (err, result) => {
        if (err)
          return res.json({
            log: false,
            message: "Unexpected error, try again",
          });

        if (result) {
          req.session.userID = userCheck[0].id;
          res.json({ log: true, message: "succes" });
        } else {
          res.json({ log: false, message: "Wrong password" });
        }
      });
    }
  } catch (error) {
    res.json({ log: false, message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    (await db)
      .query("SELECT id,name,email FROM users WHERE id = ?", [req.userID.id])
      .then((ms) => res.json({ log: true, userInfo: ms[0] }));
  } catch (error) {
    res.json({ log: false, message: "Server error" });
  }
});

router.get("/others", async (req, res) => {
  try {
    const [result] = await (
      await db
    ).query(
      "SELECT * FROM users us WHERE id != ? AND NOT EXISTS (SELECT 1 FROM friend_requests WHERE from_user = ? AND to_user = us.id)",
      [req.session.userID, req.session.userID]
    );
    res.json({ data: result });
  } catch (error) {
    console.log(error);
  }
});

router.post("/adding", async (req, res) => {
  try {
    const fromUser = req.session.userID;
    const toUser = req.body.to;
    const [result] = await (
      await db
    ).query("INSERT INTO friend_requests(from_user, to_user) VALUES (?, ?)", [
      fromUser,
      toUser,
    ]);
    result.affectedRows < 1 ? res.json({ ok: false }) : res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
});

router.get("/requests", async (req, res) => {
  const [result] = await (
    await db
  ).query(
    "select * from users us where exists (select 1 from friend_requests where from_user = us.id and to_user = ?)",
    [req.session.userID]
  );

  res.json({ data: result });
});

module.exports = router;
