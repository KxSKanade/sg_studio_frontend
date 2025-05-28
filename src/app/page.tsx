'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

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
        <h2 className="text-2xl font-bold mb-2">
          SECCIÓN: <span className="text-blue-900">ROPA</span>
        </h2>
        <p className="text-gray-700 mb-8 text-lg">Primera vista</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {productos.map(({ id, imagen, nombre, precio,descripcion }) => (
            <div key={id} className="text-center">
              {/* Si imagen es externa, puedes usar img o next/image con loader personalizado */}
              <img
                src={imagen}
                alt={nombre}
                className="w-full h-auto rounded shadow"
              />

              <p className="mt-2 text-gray-600 text-sm">{nombre}</p>
              <p className="font-semibold text-sm text-black">${precio}</p>
              <p className="font-semibold text-sm text-black">${descripcion}</p>

            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
