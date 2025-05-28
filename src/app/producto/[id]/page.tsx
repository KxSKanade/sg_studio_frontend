'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProductoDetallePage() {
  const params = useParams();
  const id = params?.id as string;
  const [producto, setProducto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos/${id}`);
        if (!res.ok) throw new Error('No se pudo obtener el producto');
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  if (loading) return <div className="p-6 text-center">Cargando producto...</div>;
  if (!producto) return <div className="p-6 text-center text-red-500">Producto no encontrado</div>;

  return (
    <div className="p-6 grid md:grid-cols-2 gap-10">
      <div className="w-full h-[500px] relative">
        <Image
          src={producto.img || '/images/default.jpg'}
          alt={producto.nombre}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{producto.nombre}</h1>
        <p className="text-pink-600 text-xl mt-2">${producto.precio}</p>
        <p className="mt-4">{producto.descripcion}</p>
        <p className="mt-4 text-sm text-gray-600">Cuidados: {producto.cuidados}</p>
        <button className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-pink-600">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
