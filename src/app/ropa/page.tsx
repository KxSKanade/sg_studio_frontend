'use client';
import ProductoCard from '../../../components/ProductoCard';

export default function RopaPage() {
  const productos = [
    { id: 1, nombre: 'Top Blanco', precio: 49.90, img: '/images/top1.jpg', tag: 'New' },
    { id: 2, nombre: 'Falda Denim', precio: 59.90, img: '/images/falda1.jpg', tag: 'Sale' },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <h1 className="text-2xl font-bold">...</h1>
      </div>
    </>
  );
}
