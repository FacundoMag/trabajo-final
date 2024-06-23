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
    mail: this.props.persona.mail
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://personas.ctpoba.edu.ar/api/personas/${this.props.persona.persona_id}`, this.state, { headers: { Authorization: `Bearer ${this.props.token}` } })
      .then(response => {
        console.log(response.data);
        this.props.onPersonaActualizada();
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="documento" value={this.state.documento} onChange={this.handleChange} />
        <input type="text" name="nombres" value={this.state.nombres} onChange={this.handleChange} />
        <input type="text" name="apellidos" value={this.state.apellidos} onChange={this.handleChange} />
        <input type="date" name="fechaNac" value={this.state.fechaNac} onChange={this.handleChange} />
        <input type="text" name="telefono" value={this.state.telefono} onChange={this.handleChange} />
        <input type="text" name="domicilio" value={this.state.domicilio} onChange={this.handleChange} />
        <input type="email" name="mail" value={this.state.mail} onChange={this.handleChange} />
        <button type="submit">Actualizar Persona</button>
      </form>
    );
  }
}
