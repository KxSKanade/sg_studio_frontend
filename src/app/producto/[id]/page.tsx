'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

import {
  ShoppingCart,
  Tag,
  Shirt,
  Palette,
  Layers,
  Info,
  ShieldCheck,
  Package
} from 'lucide-react'

export default function ProductoDetalle() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null)

  // Estado para el zoom
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left - window.scrollX) / width) * 100
    const y = ((e.pageY - top - window.scrollY) / height) * 100
    setZoomPosition({ x, y })
  }

  useEffect(() => {
    async function fetchProducto() {
      try {
        const res = await fetch(`https://sg-studio-backend.onrender.com/productos/${id}`)
        if (!res.ok) throw new Error('Error al obtener el producto')
        const data = await res.json()
        setProducto(data)
        setImagenSeleccionada(data.imagen?.[0])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProducto()
  }, [id])

  if (loading) return <p className="p-12 text-center">Cargando producto...</p>
  if (error) return <p className="p-12 text-center text-red-600">{error}</p>
  if (!producto) return <p className="p-12 text-center">Producto no encontrado</p>

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
    categoria
  } = producto

  return (
    <div className="bg-white min-h-screen px-6 md:px-12 pt-24 md:pt-32 pb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[auto_500px_1fr] gap-6">

        {/* ── Columna 1: Miniaturas ── */}
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

        {/* ── Columna 2: Imagen principal con efecto lupa ── */}
        <div
          className="relative w-full h-[500px] shadow-md rounded-lg overflow-hidden flex items-center justify-center bg-gray-100"
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
                transition: 'transform 0.2s ease'
              }}
              className="rounded-lg pointer-events-none select-none"
            />
          )}
        </div>

        {/* ── Columna 3: Detalles ── */}
        <div className="space-y-4 text-gray-800">
          <h1 className="text-4xl font-bold mb-2">{nombre}</h1>
          <p className="text-2xl text-red-700 font-semibold flex items-center gap-2">
            <Tag className="w-5 h-5" /> S/ {precio}
          </p>
          <p className="text-gray-600 italic">{descripcion}</p>

          {categoria?.nombre && (
            <p className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              <strong>Categoría:</strong> {categoria.nombre}
            </p>
          )}
          {color && (
            <p className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              <strong>Color:</strong> {color}
            </p>
          )}
          {talla && (
            <p className="flex items-center gap-2">
              <Shirt className="w-5 h-5" />
              <strong>Talla:</strong> {talla}
            </p>
          )}
          {cantidad !== undefined && (
            <p className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <strong>Stock:</strong> {cantidad}
            </p>
          )}
          {composicion && (
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <strong>Composición:</strong> {composicion}
            </p>
          )}
          {info && (
            <p className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              <strong>Info:</strong> {info}
            </p>
          )}
          {cuidados && (
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <strong>Cuidados:</strong> {cuidados}
            </p>
          )}

          <button
            className="btn-animated w-full"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <ShoppingCart className="w-5 h-5" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
