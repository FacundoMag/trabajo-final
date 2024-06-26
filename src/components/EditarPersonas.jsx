import React, { Component } from "react";
import axios from "axios";

export default class EditarPersona extends Component {
  state = {
    documento: this.props.persona.documento,
    nombres: this.props.persona.nombres,
    apellidos: this.props.persona.apellidos,
    fechaNac: this.props.persona.fechaNac,
    telefono: this.props.persona.telefono,
    domicilio: this.props.persona.domicilio,
    mail: this.props.persona.mail,
    error: null,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { token, persona, onPersonaActualizada } = this.props;
    const { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail } = this.state;

    axios
      .put(
        `https://personas.ctpoba.edu.ar/api/personas/${persona.id}`,
        { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        onPersonaActualizada();
      })
      .catch((error) => {
        console.error("Error actualizando persona:", error);
        this.setState({ error: error.message });
      });
  };

  render() {
    const { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail, error } = this.state;

    return (
      <div>
        <h2>Editar Persona</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Documento:</label>
            <input type="text" name="documento" value={documento} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Nombres:</label>
            <input type="text" name="nombres" value={nombres} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Apellidos:</label>
            <input type="text" name="apellidos" value={apellidos} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Fecha de Nacimiento:</label>
            <input type="date" name="fechaNac" value={fechaNac} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Teléfono:</label>
            <input type="text" name="telefono" value={telefono} onChange={this.handleChange} />
          </div>
          <div>
            <label>Domicilio:</label>
            <input type="text" name="domicilio" value={domicilio} onChange={this.handleChange} />
          </div>
          <div>
            <label>Mail:</label>
            <input type="email" name="mail" value={mail} onChange={this.handleChange} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Actualizar Persona</button>
        </form>
      </div>
    );
  }
}
