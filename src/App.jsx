// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import Registro from "./components/Registro";
import GestionPersonas from "./components/GestionPersonas";

const App = () => {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [registro, setRegistro] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("https://personas.ctpoba.edu.ar/api/ingresar", credentials);
      if (response.data.status === "success") {
        setToken(response.data.token);
        setUsuario(response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.user));
      } else {
        alert("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión");
    }
  };

  const handleRegister = async (newUser) => {
    try {
      const response = await axios.post("https://personas.ctpoba.edu.ar/api/registrar", newUser);
      if (response.data.status === "success") {
        setRegistro(false); // Volver a la pantalla de login después del registro
        alert("Registro exitoso, por favor inicie sesión");
      } else {
        alert("Error en el registro");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  if (!token) {
    return (
      <div>
        {registro ? (
          <Registro onRegister={handleRegister} onBack={() => setRegistro(false)} />
        ) : (
          <Login onLogin={handleLogin} onRegister={() => setRegistro(true)} />
        )}
      </div>
    );
  }

  return (
    <div>
      <GestionPersonas token={token} onLogout={handleLogout} />
    </div>
  );
};

export default App;
