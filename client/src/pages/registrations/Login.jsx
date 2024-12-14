import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handlePass1 = (e) => {
    if (document.querySelector(".pass1 input").type == "password") {
      document.querySelector(".pass1 input").type = "text";
      e.target.textContent = "Hide";
    } else {
      document.querySelector(".pass1 input").type = "password";
      e.target.textContent = "See";
    }
  };

  const handlePass2 = (e) => {
    if (document.querySelector(".pass2 input").type == "password") {
      document.querySelector(".pass2 input").type = "text";
      e.target.textContent = "Hide";
    } else {
      document.querySelector(".pass2 input").type = "password";
      e.target.textContent = "See";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "" || password == "" || password2 == "") {
      console.log("Rellena todos los campos");
    } else if (password != password2) {
      console.log("las contraseñas no coinciden");
    } else {
      try {
        axios
          .post("http://localhost:3000/login", {
            email,
            password,
          })
          .then((res) => {
            res.data.log ? navigate("/") : console.log(req.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="reg">
      <div className="container">
        <h1>Login in my web page</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="pass1">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label onClick={handlePass1}>See</label>
          </div>

          <div className="pass2">
            <input
              type="password"
              placeholder="Confirm your password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label onClick={handlePass2}>See</label>
          </div>
          <button type="submit">Login</button>
          <p>Don't you have an account yet?</p>
          <Link to={"/register"}>Register</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
