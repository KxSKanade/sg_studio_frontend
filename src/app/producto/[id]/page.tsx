'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  // Zoom
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    async function fetchProducto() {
      try {
        const res = await fetch(`https://sg-studio-backend.onrender.com/productos/${id}`);
        if (!res.ok) throw new Error('Error al obtener el producto');
        const data = await res.json();
        setProducto(data);
        setImagenSeleccionada(data.imagen?.[0] || null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProducto();
  }, [id]);

  if (loading) return <p className="p-12 text-center">Cargando producto...</p>;
  if (error) return <p className="p-12 text-center text-red-600">{error}</p>;
  if (!producto) return <p className="p-12 text-center">Producto no encontrado</p>;

  const {
    nombre,
    descripcion,
    precio,
    imagen = [],
    color,
    talla,
    cantidad,
    composicion,
    info,
    cuidados,
    categoria,
  } = producto;

  return (
    <div className="bg-white min-h-screen px-6 md:px-12 pt-24 md:pt-32 pb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[auto_500px_1fr] gap-6">

        {/* Miniaturas */}
        <div className="flex flex-row md:flex-col gap-3 items-center md:items-start">
          {imagen.map((img, index) => (
            <button
              key={index}
              onClick={() => setImagenSeleccionada(img)}
              className={`border rounded overflow-hidden w-[60px] h-[80px] hover:opacity-80 transition ${
                imagenSeleccionada === img ? 'ring-2 ring-black' : ''
              }`}
            >
              <Image
                src={img}
                alt={`Vista ${index + 1}`}
                width={60}
                height={80}
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Imagen principal con lupa */}
        <div
          className="relative w-full h-[800px] shadow-md rounded-lg overflow-hidden flex items-center justify-center bg-gray-100"
          style={{ cursor: isHovering ? 'zoom-in' : 'default' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {imagenSeleccionada && (
            <Image
              src={imagenSeleccionada}
              alt="Imagen seleccionada"
              fill
              style={{
                objectFit: 'contain',
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transform: isHovering ? 'scale(2)' : 'scale(1)',
                transition: 'transform 0.2s ease',
              }}
              className="rounded-lg pointer-events-none select-none"
            />
          )}
        </div>

        {/* Detalles */}
        <div className="space-y-4 text-gray-800">
          <h1 className="text-4xl mb-1">{nombre}</h1>
          <p className="text-2xl text-red-700">
            PEN {precio}
          </p>
          <br></br>
          <hr></hr>
          <h5 className="text-sm">{color}</h5>
          <br></br>
          <button
            className="btn-animated w-full text-sm"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Añadir al carrito
          </button>
          <br></br>
          <br></br>
          {/* Descripción minimalista */}
          <p className="text-gray-600 text-sm truncate">
            {descripcion}
          </p>

        </div>
      </div>
    </div>
  );
}
