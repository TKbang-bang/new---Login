const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const session = require("express-session");
const storage = require("./mysqlStorage.js");
const mySecret = crypto.randomUUID();

//  STARTING PROJECT
const app = express();

//  MIDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    key: "user_cookie",
    secret: mySecret,
    store: storage,
    resave: false,
    saveUninitialized: false,
  })
);

//  ROUTES
app.use(router);

app.listen(3000, () => console.log("Server on"));
