import React, { Component } from "react";
import axios from "axios";
import AgregarPersona from "./AgregarPersona";
import ListaPersonas from "./ListaPersonas";
import EditarPersona from "./EditarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: [],
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
        console.log('Personas cargadas:', response.data);
        if (response.data.status === 'success') {
          this.setState({ personas: response.data.personas, error: null });
        } else {
          this.setState({ error: response.data.error });
        }
      })
      .catch(error => {
        console.error('Error al cargar personas:', error);
        this.setState({ error: 'Error al cargar personas' });
      });
  };

  render() {
    const { personas, error } = this.state;
    const { cambiarVista } = this.props;

    return (
      <div>
        <h1>Gestión de Personas</h1>
        {error && <p>Error: {error}</p>}
        <AgregarPersona cargarPersonas={this.cargarPersonas} token={this.props.token} />
        <ListaPersonas personas={personas} cargarPersonas={this.cargarPersonas} />
        <EditarPersona />
        <button onClick={cambiarVista}>Cerrar Sesión</button>
      </div>
    );
  }
}
