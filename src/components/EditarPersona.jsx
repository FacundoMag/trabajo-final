import React, { Component } from "react";

export default class EditarPersona extends Component {
  state = {
    ...this.props.persona
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdate(this.state);
  };

  render() {
    const { nombres, apellidos, documento } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Nombres:</label>
          <input type="text" name="nombres" value={nombres} onChange={this.handleChange} />
        </div>
        <div>
          <label>Apellidos:</label>
          <input type="text" name="apellidos" value={apellidos} onChange={this.handleChange} />
        </div>
        <div>
          <label>Documento:</label>
          <input type="text" name="documento" value={documento} onChange={this.handleChange} />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    );
  }
}
