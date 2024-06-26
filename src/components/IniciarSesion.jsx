// IniciarSesion.jsx
import React, { Component } from "react";
import axios from "axios";
import './IniciarSesion.css';

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
    const { user, pass } = this.state;
    const credentials = { user, pass };

    axios.post("https://personas.ctpoba.edu.ar/api/ingresar", credentials)
      .then(response => {
        console.log("Inicio de sesión exitoso:", response.data);
        this.props.onLogin(response.data.token, response.data.user);
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
      });
  };

  render() {
    return (
      <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="user" placeholder="Usuario" onChange={this.handleChange} />
          <br />
          <input type="password" name="pass" placeholder="Contraseña" onChange={this.handleChange} />
          <br />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p className="register-link">¿No tienes cuenta? <a href="#" onClick={this.props.cambiarVista}>Regístrate</a></p>
      </div>
    );
  }
}
