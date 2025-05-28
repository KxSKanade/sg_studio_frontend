import { useEffect, useState } from 'react';

export default function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState('');

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await fetch('https://sg-studio-backend.onrender.com/categorias');
        if (!res.ok) throw new Error('Error al obtener categorías');
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategorias();
  }, []);

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar esta categoría?')) return;

    setEliminando(id);

    try {
      const res = await fetch(`https://sg-studio-backend.onrender.com/categorias/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar categoría');
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      alert(error.message);
    } finally {
      setEliminando(null);
    }
  };

  const iniciarEdicion = (id, nombre) => {
    setEditandoId(id);
    setNuevoNombre(nombre);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoNombre('');
  };

  const guardarEdicion = async () => {
    try {
      const res = await fetch(`https://sg-studio-backend.onrender.com/categorias/${editandoId}`, {
        method: 'PUT', // o PATCH según tu API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nuevoNombre }),
      });
      if (!res.ok) throw new Error('Error al actualizar categoría');

      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === editandoId ? { ...cat, nombre: nuevoNombre } : cat
        )
      );

      cancelarEdicion();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Cargando categorías...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categorias.map(({ id, nombre }) => (
        <div key={id} className="bg-white p-4 rounded shadow text-center relative">
          {editandoId === id ? (
            <>
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="border p-1 rounded mb-2 w-full"
              />
              <div className="flex justify-center gap-4">
                <button
                  onClick={guardarEdicion}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Guardar
                </button>
                <button
                  onClick={cancelarEdicion}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-800 font-semibold text-lg">{nombre}</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => iniciarEdicion(id, nombre)}
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
            </>
          )}
        </div>
      ))}
    </div>
  );
}
