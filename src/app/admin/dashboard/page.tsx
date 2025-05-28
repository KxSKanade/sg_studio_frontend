'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CrearProductoForm from './components/CrearProductoForm';

// Componente para listar productos
function ListaProductos({ onEditarProducto }) {
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
      {productos.map(({ id, imagen, nombre, precio }) => (
        <div key={id} className="bg-white p-4 rounded shadow text-center relative">
          <img src={imagen} alt={nombre} className="w-full h-48 object-cover rounded mb-2" />
          <p className="text-gray-800 font-semibold">{nombre}</p>
          <p className="text-black">${precio}</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => onEditarProducto({ id, imagen, nombre, precio })}
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

// Componente para listar categorías
function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(null);

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

  if (loading) return <p className="text-center text-lg">Cargando categorías...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categorias.map(({ id, nombre }) => (
        <div key={id} className="bg-white p-4 rounded shadow text-center relative">
          <p className="text-gray-800 font-semibold text-lg">{nombre}</p>
          <div className="flex justify-center gap-4 mt-4">
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

// Componente principal
export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [showProductos, setShowProductos] = useState(true);
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');
    if (!isLoggedIn || role !== 'admin') {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    router.push('/login');
  };

  const handleEditarProducto = (producto) => {
    setProductoEditar(producto);
    setShowProductos(true);
  };

  const handleFormularioGuardado = () => {
    setProductoEditar(null);
  };

  if (!authorized) return null;

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: '#F7F1EC',
        fontFamily: "'Adelle Sans Devanagari', sans-serif",
        color: '#A68461',
      }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 p-6 flex flex-col justify-between"
        style={{
          backgroundColor: '#A68461',
          color: '#F7F1EC',
          minHeight: '100vh',
        }}
      >
        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Beige Culture', serif" }}>
          Admin Panel
        </h1>
        <nav className="flex flex-col gap-6 text-lg">
          <button
            onClick={() => setShowProductos(true)}
            className="hover:text-black transition"
          >
            Productos
          </button>
          <button
            onClick={() => setShowProductos(false)}
            className="hover:text-black transition"
          >
            Categorías
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 px-4 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 max-w-6xl mx-auto">
        <section className="mb-10">
          <h2
            className="text-4xl font-extrabold mb-4"
            style={{ fontFamily: "'Beige Culture', serif" }}
          >
            ¡Bienvenido, Administrador!
          </h2>
        </section>

        {showProductos ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {productoEditar ? 'Editar producto' : 'Formulario de producto'}
              </h3>
              <CrearProductoForm
                producto={productoEditar}
                onGuardado={handleFormularioGuardado}
                onCancelar={() => setProductoEditar(null)}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Lista de productos</h3>
              <ListaProductos onEditarProducto={handleEditarProducto} />
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-4">Lista de categorías</h3>
            <ListaCategorias />
          </div>
        )}
      </main>
    </div>
  );
}
