import React from "react";

const ListaPersonas = ({ personas, editarPersona, eliminarPersona }) => {
  return (
    <div>
      <h2>Listado de Personas</h2>
      <ul>
        {personas.map(persona => (
          <li key={persona.persona_id}>
            <p>{persona.nombres} {persona.apellidos}</p>
            <p>Documento: {persona.documento}</p>
            <p>Fecha de Nacimiento: {persona.fechaNac}</p>
            <p>Telefono: {persona.telefono}</p>
            <p>Domicilio: {persona.domicilio}</p>
            <p>Email: {persona.mail}</p>
            <button onClick={() => editarPersona(persona)}>Editar</button>
            <button onClick={() => eliminarPersona(persona.persona_id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPersonas;
