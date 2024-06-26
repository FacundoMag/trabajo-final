// ListaPersonas.jsx
import React from "react";

const ListaPersonas = ({ personas, editarPersona, eliminarPersona }) => {
  if (!personas || personas.length === 0) {
    return <p>No hay personas para mostrar.</p>;
  }

  return (
    <div>
      <h2>Lista de Personas</h2>
      <ul>
        {personas.map(persona => (
          <li key={persona.persona_id}>
            <strong>{persona.nombres} {persona.apellidos}</strong> - {persona.documento}
            <button onClick={() => editarPersona(persona)}>Editar</button>
            <button onClick={() => eliminarPersona(persona.persona_id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPersonas;
