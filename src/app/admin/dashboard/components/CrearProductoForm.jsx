'use client';

import { useEffect, useState } from 'react';

export default function CrearProductoForm() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Cargar categorías al montar el componente
    const fetchCategorias = async () => {
      try {
        const res = await fetch('https://sg-studio-backend.onrender.com/categorias');
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !categoriaId) {
      setMensaje('Por favor, completa los campos requeridos');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('categoriaId', categoriaId);
    if (imagen) formData.append('imagen', imagen);

    try {
      const res = await fetch('https://sg-studio-backend.onrender.com/productos', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setMensaje(data.error || 'Error al crear producto');
        return;
      }

      setMensaje(`Producto "${data.nombre}" creado con éxito!`);
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCategoriaId('');
      setImagen(null);
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <div
      className="rounded-xl p-8 shadow-md mt-12 max-w-xl mx-auto"
      style={{
        backgroundColor: '#F1EDE2',
        color: '#A68461',
        fontFamily: "'Adelle Sans Devanagari', sans-serif"
      }}
    >
      <h3
        className="text-3xl font-bold mb-6"
        style={{
          fontFamily: "'Beige Culture', serif",
          color: '#A68461'
        }}
      >
        Crear Nuevo Producto
      </h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre *"
          required
          className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          rows={3}
          className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
        />

        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio *"
          required
          className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
        />

        {/* SELECT para elegir categoría */}
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] text-[#A68461] focus:outline-none"
        >
          <option value="">Selecciona una categoría *</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          className="w-full text-sm text-[#A68461]"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md shadow-md font-semibold transition"
          style={{
            backgroundColor: '#A68461',
            color: '#F7F1EC'
          }}
        >
          Crear Producto
        </button>

        {mensaje && <p className="text-center mt-4 text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}
