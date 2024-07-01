import React, { Component } from "react";
import axios from "axios";
import AgregarPersona from "./AgregarPersona";
import EditarPersona from "./EditarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: [],
    showAgregarPersona: false,
    showEditarPersona: false,
    personaSeleccionada: null,
  };

  componentDidMount() {
    this.cargarPersonas();
  }

  cargarPersonas = async () => {
    try {
      const response = await axios.get("https://personas.ctpoba.edu.ar/api/personas", {
        headers: {
          Authorization: `${this.props.token}`
        }
      });
      this.setState({ personas: response.data.personas });
    } catch (error) {
      console.error(error);
    }
  };

  handleAgregarPersona = async (nuevaPersona) => {
    try {
      const response = await axios.post("https://personas.ctpoba.edu.ar/api/personas", nuevaPersona, {
        headers: {
          Authorization: `${this.props.token}`
        }
      });
      this.setState({ personas: [...this.state.personas, response.data.persona] });
    } catch (error) {
      console.error(error);
    }
  };

  handleEditar = (persona) => {
    this.setState({ showEditarPersona: true, personaSeleccionada: persona });
  };

  handleUpdate = async (personaActualizada) => {
    try {
      const response = await axios.put(`https://personas.ctpoba.edu.ar/api/personas/${personaActualizada._id}`, personaActualizada, {
        headers: {
          Authorization: `${this.props.token}`
        }
      });
      this.setState(prevState => ({
        personas: prevState.personas.map(persona => persona._id === personaActualizada._id ? response.data.persona : persona),
        showEditarPersona: false,
        personaSeleccionada: null
      }));
    } catch (error) {
      console.error(error);
    }
  };

  handleEliminar = async (personaId) => {
    try {
      await axios.delete(`https://personas.ctpoba.edu.ar/api/personas/${personaId}`, {
        headers: {
          Authorization: `${this.props.token}`
        }
      });
      this.setState(prevState => ({
        personas: prevState.personas.filter(persona => persona._id !== personaId)
      }));
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { personas, showAgregarPersona, showEditarPersona, personaSeleccionada } = this.state;

    return (
      <div>
        <h2>Gestionar Personas</h2>
        <button onClick={() => this.setState({ showAgregarPersona: true })}>Agregar Persona</button>
        {showAgregarPersona && <AgregarPersona onAgregar={this.handleAgregarPersona} />}
        {showEditarPersona && <EditarPersona persona={personaSeleccionada} onUpdate={this.handleUpdate} />}
        {personas.length > 0 ? (
          <ul>
            {personas.map((persona) => (
              <li key={persona._id}>
                {persona.nombres} {persona.apellidos} - {persona.documento}
                <button onClick={() => this.handleEditar(persona)}>Editar</button>
                <button onClick={() => this.handleEliminar(persona._id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay personas registradas.</p>
        )}
      </div>
    );
  }
}
