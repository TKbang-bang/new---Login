import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
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
    if (name == "" || email == "" || password == "" || password2 == "") {
      console.log("Rellena todos los campos");
    } else if (password != password2) {
      console.log("las contraseñas no coinciden");
    } else {
      try {
        axios
          .post("http://localhost:3000/register", {
            name,
            email,
            password,
          })
          .then((res) => {
            res.data.log ? navigate("/") : console.log(res.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="reg">
      <div className="container">
        <h1>Register in my web page</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            <label onClick={handlePass1}>Ver</label>
          </div>

          <div className="pass2">
            <input
              type="password"
              placeholder="Confirm your password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label onClick={handlePass2}>Ver</label>
          </div>
          <button type="submit">Create user</button>
          <p>Do you already have an account?</p>
          <Link to={"/login"}>Log in</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
