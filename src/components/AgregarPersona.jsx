import React, { Component } from "react";
import axios from "axios";

export default class FormularioAgregarPersona extends Component {
  state = {
    nombres: "",
    apellidos: "",
    documento: "",
    fechaNac: "",
    telefono: "",
    domicilio: "",
    mail: "",
  };

  manejarCambio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  manejarSubmit = async (e) => {
    e.preventDefault();
    const { nombres, apellidos, documento, fechaNac, telefono, domicilio, mail } = this.state;
    try {
      const response = await axios.post("https://personas.ctpoba.edu.ar/api/personas", {
        nombres, apellidos, documento, fechaNac, telefono, domicilio, mail
      }, {
        headers: {
          Authorization: `${this.props.token}`
        }
      });
      console.log(response.data);
      this.props.agregarPersona(response.data.persona);
      this.setState({
        nombres: "",
        apellidos: "",
        documento: "",
        fechaNac: "",
        telefono: "",
        domicilio: "",
        mail: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { nombres, apellidos, documento, fechaNac, telefono, domicilio, mail } = this.state;
    return (
      <form onSubmit={this.manejarSubmit}>
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={nombres}
          onChange={this.manejarCambio}
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={apellidos}
          onChange={this.manejarCambio}
          required
        />
        <input
          type="text"
          name="documento"
          placeholder="Documento"
          value={documento}
          onChange={this.manejarCambio}
          required
        />
        <input
          type="date"
          name="fechaNac"
          placeholder="Fecha de Nacimiento"
          value={fechaNac}
          onChange={this.manejarCambio}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={telefono}
          onChange={this.manejarCambio}
        />
        <input
          type="text"
          name="domicilio"
          placeholder="Domicilio"
          value={domicilio}
          onChange={this.manejarCambio}
        />
        <input
          type="email"
          name="mail"
          placeholder="Email"
          value={mail}
          onChange={this.manejarCambio}
        />
        <button type="submit">Agregar Persona</button>
      </form>
    );
  }
}
