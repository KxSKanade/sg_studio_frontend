'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CrearProductoForm from './components/CrearProductoForm';
import CrearCategoriaForm from './components/CrearCategoriaForm';
import EditarProductoForm from './components/EditarProductoForm';
import ListarProductosAdmin from './components/ListarProductosAdmin';
import { Package, Tags, LogOut, LayoutList,ShoppingCart ,Layers3,PlusCircle} from 'lucide-react';

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
    <div className="space-y-4">
      {categorias.map(({ id, nombre, descripcion }) => (
        <div
          key={id}
          className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow transition"
        >
          <div>
            <h3 className="text-lg font-medium text-[#A68461]">{nombre}</h3>
            <p className="text-gray-500 text-sm">{descripcion}</p>
          </div>
          <button
            onClick={() => handleEliminar(id)}
            disabled={eliminando === id}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
          >
            {eliminando === id ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      ))}
    </div>


  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [showProductos, setShowProductos] = useState(true);
  const [productoEditar, setProductoEditar] = useState(null);
  const [soloListaProductos, setSoloListaProductos] = useState(false);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [cantidadCategorias, setCantidadCategorias] = useState(0);
  const [mostrarCrearProducto, setMostrarCrearProducto] = useState(false);


  useEffect(() => {
    // Obtener productos
    fetch('https://sg-studio-backend.onrender.com/productos')
      .then(res => res.json())
      .then(data => setCantidadProductos(data.length))
      .catch(err => console.error('Error al obtener productos:', err));

    // Obtener categorías
    fetch('https://sg-studio-backend.onrender.com/categorias')
      .then(res => res.json())
      .then(data => setCantidadCategorias(data.length))
      .catch(err => console.error('Error al obtener categorías:', err));
  }, []);

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
    <div className="min-h-screen flex bg-[#F7F1EC] text-[#A68461] font-sans">
      {/* Sidebar */}
      <aside className="w-64 p-6 flex flex-col justify-between bg-[#A68461] text-[#F7F1EC] shadow-md">
        <div>
          <h1 className="text-3xl font-extrabold mb-10 text-center font-serif tracking-wide">
            Admin Panel
          </h1>
          <nav className="flex flex-col gap-6 text-lg">
            <button
              onClick={() => {
                setShowProductos(true);
                setSoloListaProductos(false);
              }}
              className="flex items-center gap-2 hover:text-black transition"
            >
              <Package className="w-5 h-5" /> Productos
            </button>
            <button
              onClick={() => setShowProductos(false)}
              className="flex items-center gap-2 hover:text-black transition"
            >
              <Tags className="w-5 h-5" /> Categorías
            </button>
            <button
              onClick={() => {
                setShowProductos(true);
                setSoloListaProductos(true);
              }}
              className="flex items-center gap-2 hover:text-black transition"
            >
              <LayoutList className="w-5 h-5" /> Ver solo productos
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 px-4 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 max-w-6xl mx-auto">
       <section className="mb-10 bg-[#f5f1e9] p-8 rounded-2xl shadow-lg max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6 font-serif text-[#A68461] animate-fade-in">
            ¡Bienvenido, Administrador!
          </h2>
          <p className="text-[#7d6752] mb-8 text-lg max-w-xl">
            Aquí puedes gestionar todos los productos y  categorías  de tu tienda.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Productos */}
            <div className="bg-white rounded-xl p-6 flex items-center shadow-md hover:shadow-lg transition">
              <Package className="text-[#A68461] w-10 h-10 mr-5" />
              <div>
                <p className="text-sm text-gray-500">Productos</p>
                <p className="text-2xl font-bold text-[#A68461]">{cantidadProductos}</p>
              </div>
            </div>

            {/* Categorías */}
            <div className="bg-white rounded-xl p-6 flex items-center shadow-md hover:shadow-lg transition">
              <Layers3 className="text-[#A68461] w-10 h-10 mr-5" />
              <div>
                <p className="text-sm text-gray-500">Categorías</p>
                <p className="text-2xl font-bold text-[#A68461]">{cantidadCategorias}</p>
              </div>
            </div>
          </div>
        </section>

        {showProductos ? (
          soloListaProductos ? (
            <div>
              <h3 className="text-2xl font-bold mb-4">Lista de productos</h3>
              <ListarProductosAdmin onEditarProducto={handleEditarProducto} />
            </div>
          ) : (
            <div className="flex justify-center">
              <div >
              
                {productoEditar ? (
                  <EditarProductoForm
                    producto={productoEditar}
                    onGuardado={handleFormularioGuardado}
                    onCancelar={() => setProductoEditar(null)}
                  />
                ) : (
                  <>
                    {!mostrarCrearProducto ? (
                      <button
                        onClick={() => setMostrarCrearProducto(true)}
                        className="mb-4 px-4 py-2 bg-[#A68461] text-white rounded hover:bg-[#8f6c4d] transition"
                      >
                        <PlusCircle className="inline w-4 h-4 mr-2" /> Crear nuevo producto
                      </button>
                    ) : (
                      <div>
                        <CrearProductoForm onGuardado={() => {
                          setMostrarCrearProducto(false);
                          handleFormularioGuardado();
                        }} />
                        <button
                          onClick={() => setMostrarCrearProducto(false)}
                          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </>
                )}

              </div>
            </div>
          )
        ) : (
        <div className="mt-10 flex flex-col lg:flex-row gap-6 items-start">
          {/* Formulario para crear categoría */}
          <div className="bg-white p-4 rounded-xl shadow border w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="text-primary w-5 h-5" />
              <h2 className="text-lg font-semibold text-brown-700">Crear nueva categoría</h2>
            </div>
            <CrearCategoriaForm />
          </div>

          {/* Lista de categorías con scroll */}
          <div className="bg-white p-0 rounded-xl shadow border flex-1 max-h-[400px] overflow-y-auto relative">
            {/* Encabezado sticky con fondo sólido */}
            <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Tags className="text-primary w-5 h-5" />
                <h2 className="text-lg font-semibold text-brown-700">Lista de categorías</h2>
              </div>
            </div>

            {/* Contenido desplazable */}
            <div className="p-4">
              <ListaCategorias />
            </div>
          </div>
        </div>



        )}
      </main>
    </div>
  );
}
