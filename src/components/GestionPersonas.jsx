import React, { Component } from "react";
import axios from "axios";
import ListaPersonas from "./ListaPersonas";
import AgregarPersona from "./AgregarPersona";
import './GestionarPersonas.css';

export default class GestionPersonas extends Component {
  state = {
    personas: [],
  };

  // Función para cargar las personas desde la API
  cargarPersonas = () => {
    const { token } = this.props;

    axios.get('https://personas.ctpoba.edu.ar/api/personas', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log('Personas cargadas:', response.data);
        this.setState({ personas: response.data.personas });
      })
      .catch(error => {
        console.error('Error al cargar personas:', error);
      });
  };

  // Función para agregar una nueva persona
  agregarPersona = (nuevaPersona) => {
    const { token } = this.props;

    axios.post('https://personas.ctpoba.edu.ar/api/personas', nuevaPersona, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Persona agregada:', response.data);
        this.cargarPersonas(); // Recargar la lista de personas después de agregar
      })
      .catch(error => {
        console.error('Error al agregar persona:', error);
      });
  };

  // Función para editar una persona existente
  editarPersona = (personaActualizada) => {
    const { token } = this.props;
    const { persona_id, ...datosPersona } = personaActualizada;

    axios.put(`https://personas.ctpoba.edu.ar/api/personas/${persona_id}`, datosPersona, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Persona editada:', response.data);
        this.cargarPersonas(); // Recargar la lista de personas después de editar
      })
      .catch(error => {
        console.error('Error al editar persona:', error);
      });
  };

  // Función para eliminar una persona
  eliminarPersona = (persona_id) => {
    const { token } = this.props;

    axios.delete(`https://personas.ctpoba.edu.ar/api/personas/${persona_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log('Persona eliminada:', response.data);
        this.cargarPersonas(); // Recargar la lista de personas después de eliminar
      })
      .catch(error => {
        console.error('Error al eliminar persona:', error);
      });
  };

  componentDidMount() {
    this.cargarPersonas();
  }

  render() {
    const { personas } = this.state;

    return (
      <div>
        <AgregarPersona agregarPersona={this.agregarPersona} />
        <ListaPersonas
          personas={personas}
          editarPersona={this.editarPersona}
          eliminarPersona={this.eliminarPersona}
        />
      </div>
    );
  }
}
