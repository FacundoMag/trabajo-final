import React, { useState } from "react";
import axios from "axios";

const AgregarPersona = ({ cargarPersonas, token }) => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [documento, setDocumento] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [telefono, setTelefono] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [mail, setMail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://personas.ctpoba.edu.ar/api/personas", {
        documento,
        nombres,
        apellidos,
        fechaNac,
        telefono,
        domicilio,
        mail
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.status === "success") {
        cargarPersonas();
      } else {
        setError("Error al agregar persona");
      }
    } catch (err) {
      setError("Error al agregar persona");
    }
  };

  return (
    <div>
      <h2>Agregar Persona</h2>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombres:</label>
          <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} />
        </div>
        <div>
          <label>Apellidos:</label>
          <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
        </div>
        <div>
          <label>Documento:</label>
          <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input type="date" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div>
          <label>Domicilio:</label>
          <input type="text" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <button type="submit">Agregar Persona</button>
      </form>
    </div>
  );
};

export default AgregarPersona;
