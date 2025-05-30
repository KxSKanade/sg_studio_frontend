//admin/dashboard/components/ListarProductoAdmin
'use client';

import { useEffect, useState } from 'react';

export default function ListarProductosAdmin({ onEditarProducto }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch('https://sg-studio-backend.onrender.com/productos');
        if (!res.ok) throw new Error('Error al obtener productos');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;
    setEliminando(id);

    try {
      const res = await fetch(`https://sg-studio-backend.onrender.com/productos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar producto');
      setProductos((prev) => prev.filter((producto) => producto.id !== id));
    } catch (error) {
      alert(error.message);
    } finally {
      setEliminando(null);
    }
  };

  if (loading) return <p className="text-center text-lg">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map(({ id, imagen, nombre, precio, descripcion }) => (
        <div key={id} className="bg-white p-4 rounded shadow text-center relative">
          <img
            src={Array.isArray(imagen) && imagen.length > 0 ? imagen[0] : "/placeholder.jpg"}
            alt={nombre}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <p className="text-gray-800 font-semibold">{nombre}</p>
          <p className="text-black">{precio}</p>
          <p className="text-black">{descripcion}</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => onEditarProducto({ id, imagen, nombre, precio, descripcion })}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Editar
            </button>
            <button
              onClick={() => handleEliminar(id)}
              disabled={eliminando === id}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
            >
              {eliminando === id ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
