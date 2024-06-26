import React, { Component } from "react";
import axios from "axios";

export default class Registro extends Component {
  state = {
    nombre: "",
    email: "",
    user: "",
    pass: ""
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://personas.ctpoba.edu.ar/api/registrar", this.state)
      .then(response => {
        this.props.onRegister();
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" onChange={this.handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
          <input type="text" name="user" placeholder="Usuario" onChange={this.handleChange} />
          <input type="password" name="pass" placeholder="Contraseña" onChange={this.handleChange} />
          <button type="submit">Registrar</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="#" onClick={this.props.cambiarVista}>Inicia Sesión</a></p>
      </div>
    );
  }
}
