import React, { Component } from "react";
import axios from "axios";

export default class IniciarSesion extends Component {
  state = {
    user: "",
    pass: ""
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://personas.ctpoba.edu.ar/api/ingresar", this.state)
      .then(response => {
        this.props.onLogin(response.data.token, response.data.user);
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
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>¿No tienes cuenta? <a href="#" onClick={this.props.cambiarVista}>Regístrate</a></p>
      </div>
    );
  }
}
