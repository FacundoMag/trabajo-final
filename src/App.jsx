import React, { Component } from "react";
import axios from "axios";
import GestionPersonas from "./components/GestionPersonas";
import Registro from "./components/Registro";
import IniciarSesion from "./components/IniciarSesion";
import ListaPersonas from "./components/ListaPersonas";

export default class App extends Component {
  state = {
    token: null,
    user: null,
    vista: "iniciarSesion",
  };

  // Función para manejar el inicio de sesión
  handleLogin = (token, user) => {
    this.setState({ token, user, vista: "gestionPersonas" });
    // Guardar el token en localStorage para persistencia
    localStorage.setItem('token', token);
    // Configurar el token en Axios globalmente
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Función para cambiar entre vista de inicio de sesión y registro
  cambiarVista = () => {
    const { vista } = this.state;
    if (vista === "iniciarSesion") {
      this.setState({ vista: "registro" });
    } else {
      this.setState({ vista: "iniciarSesion" });
    }
  };

  // Verificar el token al cargar la aplicación
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ token, vista: "gestionPersonas" });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  render() {
    const { vista, token, user } = this.state;

    return (
      <div>
        {vista === "iniciarSesion" && (
          <IniciarSesion onLogin={this.handleLogin} cambiarVista={this.cambiarVista} />
        )}
        {vista === "registro" && <Registro onRegister={this.cambiarVista} />}
        {vista === "gestionPersonas" && <GestionPersonas token={token} user={user} />}
      </div>
    );
  }
}
