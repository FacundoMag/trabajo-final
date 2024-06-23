import React, { Component } from "react";
import axios from "axios";

export default class Registro extends Component {
  state = {
    user: "",
    pass: "",
    nombres: "",
    apellidos: "",
    documento: ""
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://personas.ctpoba.edu.ar/api/registrar", this.state)
      .then(response => {
        // manejar respuesta, posiblemente iniciar sesión automáticamente
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="user" placeholder="Usuario" onChange={this.handleChange} />
          <input type="password" name="pass" placeholder="Contraseña" onChange={this.handleChange} />
          <input type="text" name="nombres" placeholder="Nombres" onChange={this.handleChange} />
          <input type="text" name="apellidos" placeholder="Apellidos" onChange={this.handleChange} />
          <input type="text" name="documento" placeholder="Documento" onChange={this.handleChange} />
          <button type="submit">Registrar</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="#" onClick={this.props.cambiarVista}>Inicia Sesión</a></p>
      </div>
    );
  }
}
