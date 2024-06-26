import React, { Component } from "react";
import ListaPersonas from "./ListaPersonas";
import AgregarPersona from "./AgregarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: [],
  };

  componentDidMount() {
    this.cargarPersonas();
  }

  cargarPersonas = () => {
    const { api } = this.props;
    api.get('/personas')
      .then(response => {
        this.setState({ personas: response.data.personas });
      })
      .catch(error => {
        console.error('Error al cargar personas: ', error);
      });
  };

  agregarPersona = (nuevaPersona) => {
    const { api } = this.props;
    api.post('/personas', nuevaPersona)
      .then(response => {
        console.log('Persona agregada:', response.data);
        this.cargarPersonas();
      })
      .catch(error => {
        console.error('Error al agregar persona:', error);
      });
  };

  editarPersona = (personaActualizada) => {
    const { api } = this.props;
    const { persona_id, ...datosPersona } = personaActualizada;
    api.put(`/personas/${persona_id}`, datosPersona)
      .then(response => {
        console.log('Persona editada:', response.data);
        this.cargarPersonas();
      })
      .catch(error => {
        console.error('Error al editar persona:', error);
      });
  };

  eliminarPersona = (persona_id) => {
    const { api } = this.props;
    api.delete(`/personas/${persona_id}`)
      .then(response => {
        console.log('Persona eliminada:', response.data);
        this.cargarPersonas();
      })
      .catch(error => {
        console.error('Error al eliminar persona:', error);
      });
  };

  render() {
    return (
      <div>
        <AgregarPersona agregarPersona={this.agregarPersona} />
        <ListaPersonas
          personas={this.state.personas}
          editarPersona={this.editarPersona}
          eliminarPersona={this.eliminarPersona}
        />
      </div>
    );
  }
}

