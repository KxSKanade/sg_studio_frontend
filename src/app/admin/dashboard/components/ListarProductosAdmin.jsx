'use client';

import { useEffect, useState, useRef } from 'react';

export default function ListarProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(null);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [nuevaImagenes, setNuevaImagenes] = useState([]); 
  const nuevaImagenesURLs = useRef([]); 
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');



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

  const abrirModalEditar = (producto) => {
    setProductoEditando(producto);

    // Limpiar URLs de imágenes previas
    nuevaImagenesURLs.current.forEach(url => URL.revokeObjectURL(url));
    nuevaImagenesURLs.current = [];

    setNuevaImagenes([]);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoEditando(null);

    // Liberar URLs creadas
    nuevaImagenesURLs.current.forEach(url => URL.revokeObjectURL(url));
    nuevaImagenesURLs.current = [];
    setNuevaImagenes([]);
  };

  const handleCambio = (e) => {
    const { name, value } = e.target;
    setProductoEditando((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagenChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // máximo 3 archivos

    // Liberar URLs previas
    nuevaImagenesURLs.current.forEach(url => URL.revokeObjectURL(url));
    nuevaImagenesURLs.current = files.map(file => URL.createObjectURL(file));

    setNuevaImagenes(files);
  };
  const handleGuardar = async () => {
    try {
      let bodyData = { ...productoEditando };

      // Si quieres manejar la imagen como base64 o formData, deberías ajustar aquí
      // Por simplicidad, asumo que no se cambia la imagen por ahora

      const res = await fetch(`https://sg-studio-backend.onrender.com/productos/${productoEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        throw new Error('Error al guardar el producto');
      }

      const productoActualizado = await res.json();

      setProductos((prev) =>
        prev.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
      );

      cerrarModal();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p className="text-center text-lg">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map(({ id, imagen, nombre, precio, descripcion, color, talla, cantidad, composicion, info, cuidados, categoria }) => (
          <div key={id} className="bg-white p-4 rounded shadow text-center relative">
            <img
              src={
                Array.isArray(imagen) && imagen.length > 0
                  ? imagen[0]
                  : "/placeholder.jpg"
              }
              alt="Imagen producto"
              className="w-full h-48 object-cover rounded mb-2"
            />

            <p className="text-gray-800 font-semibold">{nombre}</p>
            <p className="text-black font-bold">${precio}</p>
            <p className="text-black">{descripcion}</p>
            {categoria?.nombre && <p className="text-gray-600">Categoría: {categoria.nombre}</p>}
            {color && <p className="text-gray-600">Color: {color}</p>}
            {talla && <p className="text-gray-600">Talla: {talla}</p>}
            {cantidad !== undefined && <p className="text-gray-600">Cantidad: {cantidad}</p>}
            {composicion && <p className="text-gray-600">Composición: {composicion}</p>}
            {info && <p className="text-gray-600">Info: {info}</p>}
            {cuidados && <p className="text-gray-600">Cuidados: {cuidados}</p>}

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => abrirModalEditar({ id, imagen, nombre, precio, descripcion, color, talla, cantidad, composicion, info, cuidados })}
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


      {modalAbierto && productoEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGuardar();
              }}
            >
              <label className="block mb-2">
                Nombre:
                <input
                  name="nombre"
                  value={productoEditando.nombre}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                  required
                />
              </label>

              <label className="block mb-2">
                Precio:
                <input
                  type="number"
                  name="precio"
                  value={productoEditando.precio}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                  step="0.01"
                  required
                />
              </label>

              <label className="block mb-2">
                Descripción:
                <textarea
                  name="descripcion"
                  value={productoEditando.descripcion}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                  rows={3}
                />
              </label>

              <label className="block mb-2">
                Color:
                <input
                  name="color"
                  value={productoEditando.color || ''}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                />
              </label>

              <label className="block mb-2">
                Talla:
                <input
                  name="talla"
                  value={productoEditando.talla || ''}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                />
              </label>

              <label className="block mb-2">
                Cantidad:
                <input
                  type="number"
                  name="cantidad"
                  value={productoEditando.cantidad || ''}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                />
              </label>

              <label className="block mb-2">
                Composición:
                <input
                  name="composicion"
                  value={productoEditando.composicion || ''}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                />
              </label>

              <label className="block mb-2">
                Info:
                <input
                  name="info"
                  value={productoEditando.info || ''}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                />
              </label>

              <label className="block mb-2">
                Cuidados:
                <input
                  name="cuidados"
                  value={productoEditando.cuidados || ''}
                  onChange={handleCambio}
                  className="w-full border p-2 rounded"
                />
              </label>
           
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
