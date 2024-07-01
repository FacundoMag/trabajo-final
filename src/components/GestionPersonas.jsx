import React, { Component } from "react";
import axios from "axios";
import AgregarPersona from "./AgregarPersona";
import ListaPersonas from "./ListaPersonas";
import EditarPersona from "./EditarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: [],
    personaSeleccionada: null,
    error: null
  };

  componentDidMount() {
    this.cargarPersonas();
  }

  cargarPersonas = () => {
    const { token } = this.props;

    axios.get('https://personas.ctpoba.edu.ar/api/personas', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          this.setState({ personas: response.data.personas, error: null });
        } else {
          this.setState({ error: response.data.error });
        }
      })
      .catch(error => {
        this.setState({ error: 'Error al cargar personas' });
      });
  };

  seleccionarPersona = (persona) => {
    this.setState({ personaSeleccionada: persona });
  };

  render() {
    const { personas, personaSeleccionada, error } = this.state;
    const { cambiarVista, token } = this.props;

    return (
      <div>
        <h1>Gestión de Personas</h1>
        {error && <p>Error: {error}</p>}
        <AgregarPersona cargarPersonas={this.cargarPersonas} token={token} />
        <ListaPersonas personas={personas} cargarPersonas={this.cargarPersonas} seleccionarPersona={this.seleccionarPersona} />
        {personaSeleccionada && <EditarPersona persona={personaSeleccionada} token={token} cargarPersonas={this.cargarPersonas} />}
        <button onClick={cambiarVista}>Cerrar Sesión</button>
      </div>
    );
  }
}
