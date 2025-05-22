'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ProductoDetallePage() {
  const { id } = useParams();
  const producto = {
    id,
    nombre: 'Top Blanco',
    precio: 49.90,
    descripcion: 'Top blanco elegante para uso casual o formal.',
    cuidados: 'Lavar a mano, no usar secadora.',
    img: '/images/top1.jpg',
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-10">
      <div className="w-full h-[500px] relative">
        <Image
          src={producto.img}
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
        <div className="mt-10">
  <h2 className="text-xl font-semibold mb-2">Combina con:</h2>
  <div className="grid grid-cols-2 gap-4">
    {/* Esto sería un map de productos relacionados */}
    <div className="border p-2">
      <img src="/images/falda1.jpg" alt="Falda" className="w-full h-40 object-cover" />
      <p>Falda Denim</p>
    </div>
    <div className="border p-2">
      <img src="/images/blazer1.jpg" alt="Blazer" className="w-full h-40 object-cover" />
      <p>Blazer Blanco</p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
