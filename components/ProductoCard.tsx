import Link from 'next/link';

export default function ProductoCard({ producto }) {
  return (
    <Link href={`/producto/${producto.id}`} className="border p-2 shadow hover:shadow-lg">
      <img src={producto.img} alt={producto.nombre} className="w-full h-48 object-cover" />
      <div className="mt-2">
        <h3 className="font-semibold">{producto.nombre}</h3>
        <p className="text-pink-600">${producto.precio}</p>
        <span className="text-xs text-white bg-black px-2 py-1 rounded">{producto.tag}</span>
      </div>
    </Link>
  );
}
