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
    api: axios.create({
      baseURL: 'https://personas.ctpoba.edu.ar/api',
    }),
  };

  handleLogin = (token, user) => {
    this.setState({ token, user, vista: "gestionPersonas" });
    this.state.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  cambiarVista = () => {
    const { vista } = this.state;
    if (vista === "iniciarSesion") {
      this.setState({ vista: "registro" });
    } else {
      this.setState({ vista: "iniciarSesion" });
    }
  };

  render() {
    const { vista, token, api } = this.state;

    return (
      <div>
        {vista === "iniciarSesion" && (
          <IniciarSesion onLogin={this.handleLogin} cambiarVista={this.cambiarVista} />
        )}
        {vista === "registro" && <Registro onRegister={this.cambiarVista} />}
        {vista === "gestionPersonas" && <GestionPersonas api={api} token={token} />}
      </div>
    );
  }
}
