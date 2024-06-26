// AgregarPersona.jsx
import React, { Component } from "react";

export default class AgregarPersona extends Component {
  state = {
    nombres: "",
    apellidos: "",
    documento: "",
    fechaNac: "",
    telefono: "",
    domicilio: "",
    mail: ""
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { nombres, apellidos, documento, fechaNac, telefono, domicilio, mail } = this.state;
    const nuevaPersona = { nombres, apellidos, documento, fechaNac, telefono, domicilio, mail };

    this.props.agregarPersona(nuevaPersona);
    this.setState({
      nombres: "",
      apellidos: "",
      documento: "",
      fechaNac: "",
      telefono: "",
      domicilio: "",
      mail: ""
    });
  };

  render() {
    return (
      <div>
        <h2>Agregar Persona</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="nombres" placeholder="Nombres" onChange={this.handleChange} required />
          <br />
          <input type="text" name="apellidos" placeholder="Apellidos" onChange={this.handleChange} required />
          <br />
          <input type="text" name="documento" placeholder="Documento" onChange={this.handleChange} required />
          <br />
          <input type="date" name="fechaNac" placeholder="Fecha de Nacimiento" onChange={this.handleChange} />
          <br />
          <input type="text" name="telefono" placeholder="Teléfono" onChange={this.handleChange} />
          <br />
          <input type="text" name="domicilio" placeholder="Domicilio" onChange={this.handleChange} />
          <br />
          <input type="email" name="mail" placeholder="Email" onChange={this.handleChange} />
          <br />
          <button type="submit">Agregar Persona</button>
        </form>
      </div>
    );
  }
}
