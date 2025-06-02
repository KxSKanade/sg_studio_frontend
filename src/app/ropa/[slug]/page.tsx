import { notFound } from 'next/navigation';

type Producto = {
  id: number;
  nombre: string;
  imagen: string[];
  precio: number;
  categoria: {
    nombre: string;
  };
};

// ✅ Añadimos cache: 'no-store' para evitar que use datos viejos en producción
async function getProductosPorCategoria(slug: string): Promise<Producto[]> {
  const res = await fetch('https://sg-studio-backend.onrender.com/productos', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('No se pudieron cargar los productos');

  const data = await res.json();

  // 🔍 Convertimos el nombre de la categoría a slug
  return data.filter((producto: Producto) => {
    const nombreCategoria = producto.categoria?.nombre ?? '';
    const nombreSlug = nombreCategoria.toLowerCase().replace(/\s+/g, '-');
    return nombreSlug === slug.toLowerCase(); // ✅ comparación en minúsculas
  });
}

export default async function CategoriaPage({ params }: { params: { slug: string } }) {
  const productos = await getProductosPorCategoria(params.slug);

  if (!productos.length) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Productos de la categoría: {params.slug.replace(/-/g, ' ')}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded-lg p-4">
            <img
              src={producto.imagen[0]}
              alt={producto.nombre}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{producto.nombre}</h2>
            <p className="text-gray-500">${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
