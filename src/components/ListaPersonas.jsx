import React from "react";

const ListaPersonas = ({ personas, cargarPersonas }) => {
  return (
    <div>
      <h2>Listado de Personas</h2>
      <ul>
        {personas && personas.map(persona => (
          <li key={persona.persona_id}>
            <p>Nombre: {persona.nombres} {persona.apellidos}</p>
            <p>Documento: {persona.documento}</p>
            <p>Fecha de Nacimiento: {persona.fechaNac}</p>
            <p>Teléfono: {persona.telefono}</p>
            <p>Domicilio: {persona.domicilio}</p>
            <p>Email: {persona.mail}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => cargarPersonas()}>Recargar Personas</button>
    </div>
  );
};

export default ListaPersonas;
