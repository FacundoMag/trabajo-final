import React, { Component } from "react";
import Registro from "./components/Registro";
import IniciarSesion from "./components/IniciarSesion";
import GestionPersonas from "./components/GestionPersonas";

export default class App extends Component {
  state = {
    token: null,
    user: null,
    mostrarRegistro: false
  };

  handleLogin = (token, user) => {
    this.setState({ token, user });
  };

  handleLogout = () => {
    this.setState({ token: null, user: null });
  };

  cambiarVista = () => {
    this.setState({ mostrarRegistro: !this.state.mostrarRegistro });
  };

  render() {
    const { token, mostrarRegistro } = this.state;

    return (
      <div>
        {!token ? (
          <div>
            {mostrarRegistro ? (
              <Registro cambiarVista={this.cambiarVista} />
            ) : (
              <IniciarSesion onLogin={this.handleLogin} cambiarVista={this.cambiarVista} />
            )}
          </div>
        ) : (
          <div>
            <button onClick={this.handleLogout}>Cerrar Sesión</button>
            <GestionPersonas token={token} />
          </div>
        )}
      </div>
    );
  }
}
