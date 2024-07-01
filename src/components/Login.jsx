// src/components/Login.jsx
import React, { useState } from "react";

const Login = ({ onLogin, onRegister }) => {
  const [credentials, setCredentials] = useState({ user: "", pass: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="user"
            value={credentials.user}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="pass"
            value={credentials.pass}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes usuario? <button onClick={onRegister}>Registrarse</button>
      </p>
    </div>
  );
};

export default Login;
