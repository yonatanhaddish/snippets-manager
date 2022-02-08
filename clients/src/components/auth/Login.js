import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  async function login(e) {
      e.preventDefult();

      const loginData= {
          email: formEmail,
          password: formPassword
      };

      await Axios.post("http://localhost:5000/auth/login/", loginData);
  };

  return (
    <div className="auth-form">
      <h2>Log in</h2>
      <form>
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
        <button type="submit" onClick={login}>Log in</button>
      </form>
      <p>Dont have an account? <Link to='/register'>Register instead</Link></p>
    </div>
  );
};

export default Login;
