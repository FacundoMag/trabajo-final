import React, { Component } from "react";
import ListaPersonas from "./ListaPersonas";
import AgregarPersona from "./AgregarPersona";
import './GestionarPersonas.css';

export default class GestionPersonas extends Component {
  state = {
    personas: []
  };

  onPersonaAgregada = (persona) => {
    this.setState((prevState) => ({
      personas: [...prevState.personas, persona]
    }));
  };

  render() {
    const { token } = this.props;

    return (
      <div>
        <h2>Gestionar Personas</h2>
        <AgregarPersona token={token} onPersonaAgregada={this.onPersonaAgregada} />
        <ListaPersonas token={token} personas={this.state.personas} />
      </div>
    );
  }
}
