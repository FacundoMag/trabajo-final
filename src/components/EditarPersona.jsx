import React, { Component } from "react";
import axios from "axios";

export default class EditarPersona extends Component {
  state = {
    persona: null,
    error: null
  };

  componentDidMount() {
    const { persona } = this.props;

    if (persona) {
      this.setState({ persona });
    } else {
      this.setState({ error: "No hay persona para editar" });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      persona: {
        ...prevState.persona,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { persona } = this.state;
    const { token, cargarPersonas } = this.props;

    axios.put(`https://personas.ctpoba.edu.ar/api/personas/${persona.persona_id}`, persona, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          cargarPersonas(); // Recargar la lista de personas
        } else {
          this.setState({ error: 'Error al actualizar persona' });
        }
      })
      .catch(error => {
        this.setState({ error: 'Error al actualizar persona' });
      });
  };

  render() {
    const { persona, error } = this.state;

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (!persona) {
      return null;
    }

    return (
      <div>
        <h2>Editar Persona</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Nombres:</label>
            <input type="text" name="nombres" value={persona.nombres} onChange={this.handleChange} />
          </div>
          <div>
            <label>Apellidos:</label>
            <input type="text" name="apellidos" value={persona.apellidos} onChange={this.handleChange} />
          </div>
          <div>
            <label>Documento:</label>
            <input type="text" name="documento" value={persona.documento} onChange={this.handleChange} />
          </div>
          <div>
            <label>Fecha de Nacimiento:</label>
            <input type="date" name="fechaNac" value={persona.fechaNac} onChange={this.handleChange} />
          </div>
          <div>
            <label>Teléfono:</label>
            <input type="text" name="telefono" value={persona.telefono} onChange={this.handleChange} />
          </div>
          <div>
            <label>Domicilio:</label>
            <input type="text" name="domicilio" value={persona.domicilio} onChange={this.handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="mail" value={persona.mail} onChange={this.handleChange} />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    );
  }
}
