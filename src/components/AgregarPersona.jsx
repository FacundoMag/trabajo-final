import React, { Component } from "react";
import axios from "axios";
import './Styles.css';

export default class AgregarPersona extends Component {
  state = {
    documento: "",
    nombres: "",
    apellidos: "",
    fechaNac: "",
    telefono: "",
    domicilio: "",
    mail: "",
    error: null,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail } = this.state;
    const { token, onPersonaAgregada } = this.props;

    axios
      .post(
        "https://personas.ctpoba.edu.ar/api/personas",
        { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const newPersona = response.data.persona || response.data;
        onPersonaAgregada(newPersona);
        this.setState({
          documento: "",
          nombres: "",
          apellidos: "",
          fechaNac: "",
          telefono: "",
          domicilio: "",
          mail: "",
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error agregando persona:", error);
        this.setState({ error: error.message });
      });
  };

  render() {
    const { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail, error } = this.state;

    return (
      <div>
        <h2>Agregar Persona</h2>
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
          <button type="submit">Agregar Persona</button>
        </form>
      </div>
    );
  }
}
