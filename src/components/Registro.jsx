// src/components/Registro.jsx
import React, { useState } from "react";

const Registro = ({ onRegister, onBack }) => {
  const [newUser, setNewUser] = useState({
    user: "",
    pass: "",
    nombres: "",
    apellidos: "",
    documento: ""
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(newUser);
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="user"
            value={newUser.user}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="pass"
            value={newUser.pass}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombres:</label>
          <input
            type="text"
            name="nombres"
            value={newUser.nombres}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            value={newUser.apellidos}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Documento:</label>
          <input
            type="text"
            name="documento"
            value={newUser.documento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <button onClick={onBack}>Volver a Iniciar Sesión</button>
    </div>
  );
};

export default Registro;
