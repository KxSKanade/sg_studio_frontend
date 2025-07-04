'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

type Usuario = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
};

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string[];
};

type ItemCarrito = {
  id: number;
  cantidad: number;
  talla: string;
  color: string;
  producto: Producto;
};
type Orden = {
  id: number;
  estado: string;
  total: number;
  createdAt: string;
};

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [loadingCarrito, setLoadingCarrito] = useState(true);
  const [mensajeCompra, setMensajeCompra] = useState('');
  const [comprando, setComprando] = useState(false);
  const [ordenes, setOrdenes] = useState<Orden[]>([]);

  const router = useRouter();
 
  useEffect(() => {
    async function fetchOrdenes() {
      if (!usuario?.id) return;
      try {
        const res = await fetch(`https://sg-studio-backend.onrender.com/ordenes`);
        const data = await res.json();

        // Filtrar órdenes del usuario
        const ordenesUsuario = data.filter((orden: any) => orden.usuarioId === usuario.id);
        setOrdenes(ordenesUsuario);
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrdenes();
  }, [usuario]);




  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedUser && isLoggedIn === 'true') {
      setUsuario(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    async function fetchCarrito() {
      if (!usuario?.id) return;
      try {
        const res = await fetch(`https://sg-studio-backend.onrender.com/carrito/${usuario.id}`);
        const data = await res.json();
        setCarrito(data.items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCarrito(false);
      }
    }

    fetchCarrito();
  }, [usuario]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    router.push('/');
  };

  const handleEliminarItem = async (itemId: number) => {
    try {
      await fetch(`https://sg-studio-backend.onrender.com/carritoIitem/${itemId}`, {
        method: 'DELETE',
      });
      setCarrito((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Error al eliminar el producto del carrito:', err);
    }
  };

  const handleEliminarOrden = async (ordenId: number) => {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta orden?');
    if (!confirmacion) return;

    try {
      const res = await fetch(`https://sg-studio-backend.onrender.com/ordenes/${ordenId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Error al eliminar la orden');
      }

      // Eliminar del estado local
      setOrdenes((prev) => prev.filter((orden) => orden.id !== ordenId));
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al eliminar la orden.');
    }
  };


  const handleFinalizarCompra = async () => {
    setComprando(true);
    try {
      for (const item of carrito) {
        await handleEliminarItem(item.id);
      }
      localStorage.setItem('carritoActualizado', 'true');

      setMensajeCompra('¡Gracias por tu compra!');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      console.error('Error al finalizar la compra:', err);
    } finally {
      setComprando(false);
    }
  };

  if (!usuario) {
    return <p className="text-center mt-10 text-gray-600">Cargando datos del usuario...</p>;
  }

  return (
    <section className="min-h-screen pt-24 px-4 md:px-8 bg-white text-black">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex justify-between items-center border-b border-gray-300 pb-6">
          <h1 className="text-3xl font-bold tracking-tight uppercase">Mi cuenta</h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium border border-red-500 px-4 py-1.5 rounded hover:bg-red-500 hover:text-white transition"
          >
            Cerrar sesión
          </button>
        </div>

        <div>
          <p className="text-gray-700 text-lg">
            ¡Hola <span className="font-semibold">{usuario.nombre}</span>! Aquí puedes gestionar tu
            cuenta y ver tus productos en el carrito.
          </p>
        </div>

        {mensajeCompra && (
          <div className="p-4 text-center bg-green-100 text-green-800 rounded-md">
            {mensajeCompra}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold uppercase">Carrito de compras</h2>
          {loadingCarrito ? (
            <p className="text-gray-500">Cargando productos...</p>
          ) : carrito.length === 0 ? (
            <>
              <p className="text-gray-600">Tu carrito está vacío.</p>
              <a
                href="/"
                className="inline-block mt-2 px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition text-sm"
              >
                Seguir comprando
              </a>
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {carrito.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={item.producto.imagen[0]}
                      alt={item.producto.nombre}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-semibold">{item.producto.nombre}</h3>
                      <p className="text-sm text-gray-700">PEN {item.producto.precio}</p>
                      <p className="text-sm text-gray-500">
                        Talla: {item.talla} | Color: {item.color}
                      </p>
                      <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>

                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => handleEliminarItem(item.id)}
                          className="text-gray-600 text-sm hover:underline"
                        >
                          Eliminar producto
                        </button>

                        <button
                          onClick={() => handleEliminarItem(item.id)}
                          className="text-red-500 hover:text-gray-700 text-lg"
                          title="Eliminar producto"
                        >
                          <FaTrash className='text-black' />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleFinalizarCompra}
                disabled={comprando}
                className={`mt-4 px-4 py-2 rounded text-sm transition ${
                  comprando
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {comprando ? 'Procesando...' : 'Finalizar compra'}
              </button>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold uppercase">Mis órdenes</h2>
          {ordenes.length === 0 ? (
            <p className="text-gray-600">Aún no has realizado ninguna orden.</p>
          ) : (
            <div className="space-y-4">
              {ordenes.map((orden) => (
                <div key={orden.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition relative">
                  <button
                    onClick={() => handleEliminarOrden(orden.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                  <p className="text-sm text-gray-600">Orden #{orden.id}</p>
                  <p className="text-lg font-semibold">Total: PEN {orden.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Estado: <span className="font-medium">{orden.estado}</span></p>
                  <p className="text-sm text-gray-400">Fecha: {new Date(orden.createdAt).toLocaleString()}</p>
                </div>

              ))}
            </div>
          )}
        </div>

      


        <div className="border-t border-gray-300 pt-6">
          <h2 className="text-xl font-semibold uppercase mb-4">Información de la cuenta</h2>
          <div className="space-y-2 text-sm text-gray-800">
            <p>
              <strong>Nombre:</strong> {usuario.nombre}
            </p>
            <p>
              <strong>Email:</strong> {usuario.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
