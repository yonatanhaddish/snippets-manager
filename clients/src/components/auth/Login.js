import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../auth/AuthForm.scss";


const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const navigate= useNavigate();

  async function login(e) {
      e.preventDefult();

      const loginData= {
          email: formEmail,
          password: formPassword
      };
console.log("111");
      await Axios.post("http://localhost:5000/auth/login/", loginData);
      console.log("222");
      
      navigate('/');
      console.log("333");
  };

  return (
    <div className="auth-form" onSubmit={login}>
      <h2>Log in</h2>
      <form className="form">
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        <button className="btn-submit" type="submit">Log in</button>
      </form>
      <p>Dont have an account? <Link to='/register'>Register instead</Link></p>
    </div>
  );
};

export default Login;
