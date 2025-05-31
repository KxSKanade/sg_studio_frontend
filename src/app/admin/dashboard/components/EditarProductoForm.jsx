//admin/dashboard/components/EditarProductoForm
'use client';

import { useState, useEffect } from 'react';

export default function EditarProductoForm({ producto, onGuardado, onCancelar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        precio: producto.precio || '',
        descripcion: producto.descripcion || '',
        imagen: producto.imagen || '',
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://sg-studio-backend.onrender.com/productos/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al actualizar producto');

      alert('Producto actualizado exitosamente');
      onGuardado();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block font-semibold">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Precioasdas</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">URL Imagen</label>
        <input
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
