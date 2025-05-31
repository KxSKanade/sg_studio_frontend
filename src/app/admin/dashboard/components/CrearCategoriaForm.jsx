'use client';

import { useState } from 'react';

export default function CrearCategoriaForm() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setMensaje('El nombre de la categoría es requerido');
      return;
    }

    try {
      const res = await fetch('https://sg-studio-backend.onrender.com/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre,descripcion })

      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || 'Error al crear categoría');
        return;
      }

      setMensaje(`Categoría "${data.nombre}" creada con éxito`);
      setMensaje(`Categoría "${data.descripcion}" creada con éxito`);
      setNombre('');
      setDescripcion('');
    } catch (error) {
      console.error(error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div
      className="rounded-xl p-6 shadow-md mt-10 max-w-lg mx-auto"
      style={{
        backgroundColor: '#F1EDE2',
        color: '#A68461',
        fontFamily: "'Adelle Sans Devanagari', sans-serif"
      }}
    >
      <h3
        className="text-2xl font-bold mb-4"
        style={{
          fontFamily: "'Beige Culture', serif",
          color: '#A68461'
        }}
      >
        Crear Nueva Categoría
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la categoría"
          className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
        />
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripcion de la categoria"
          className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md shadow-md font-semibold transition"
          style={{
            backgroundColor: '#A68461',
            color: '#F7F1EC'
          }}
        >
          Crear Categoría
        </button>

        {mensaje && <p className="text-center mt-2 text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}
