'use client'

import ProductoCard from '../../components/ProductoCard.jsx'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = ['/images/7.png', '/images/8.png']

function Slideshow({ slides, interval = 5000 }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, interval)
    return () => clearInterval(timer)
  }, [interval, slides.length])

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <Image
        src={slides[current]}
        alt={`Slide ${current + 1}`}
        fill
        className="object-cover transition-all duration-500"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h5 className="text-white text-4xl font-bold drop-shadow-lg">
          Bienvenido a CIAO BELLA
        </h5>
      </div>
    </section>
  )
}

export default function Home() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch('https://sg-studio-backend.onrender.com/productos')
        if (!res.ok) throw new Error('Error al obtener productos')
        const data = await res.json()
        setProductos(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProductos()
  }, [])

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      } else {
        return [...prev, { ...producto, cantidad: 1 }]
      }
    })
  }

  if (loading) {
    return <p className="p-12 text-center text-lg">Cargando productos...</p>
  }

  if (error) {
    return <p className="p-12 text-center text-red-600">{error}</p>
  }

  return (
    <main>
      <Slideshow slides={slides} />

      <section className="p-12 bg-white">
        <h2 className="text-2xl font-bold mb-4">
          SECCIÓN: <span className="text-blue-900">ROPA</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {productos
            .filter((p) => Array.isArray(p.imagen) && p.imagen.length > 0)
            .map(({ id, imagen, nombre, precio, descripcion }) => {
              const imagenPrincipal = imagen[0]
              const imagenHover = imagen[1]

              return (
                <Link key={id} href={`/producto/${id}`} className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:scale-105 group">
                    <div className="relative w-full h-120 group">
                      <img
                        src={imagenPrincipal}
                        alt={nombre}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                          imagenHover ? 'group-hover:opacity-0' : ''
                        }`}
                      />
                      {imagenHover && (
                        <img
                          src={imagenHover}
                          alt={`${nombre} alternativa`}
                          className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          agregarAlCarrito({ id, nombre, precio })
                        }}
                        className="absolute bottom-2 right-2 bg-white rounded-full p-2 text-black hover:bg-gray-100 shadow transition"
                        aria-label="Agregar al carrito"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          fill="none"
                          width="16"
                          height="16"
                          viewBox="0 0 12 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M6 0v12M0 6h12" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-4 text-center">
                      <p className="text-gray-700 text-sm font-semibold">{nombre}</p>
                      <p className="text-black text-sm font-semibold">${precio}</p>
                      <p className="text-gray-500 text-xs mt-1">{descripcion}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
      </section>
    </main>
  )
}
