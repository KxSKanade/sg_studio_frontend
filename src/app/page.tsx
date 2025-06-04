'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = ['/images/home2.jpg', '/images/home4.jpg']

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

  const productoAleatorio = productos.length > 0 ? productos[Math.floor(Math.random() * productos.length)] : null

  if (loading) {
    return <p className="p-12 text-center text-lg">Cargando productos...</p>
  }

  if (error) {
    return <p className="p-12 text-center text-red-600">{error}</p>
  }

  return (
    <main>
      <Slideshow slides={slides} />

      <section className="py-8 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {productos
            .filter((p) => Array.isArray(p.imagen) && p.imagen.length > 0)
            .map(({ id, imagen, nombre, precio, descripcion }) => {
              const imagenPrincipal = imagen[0]
              const imagenHover = imagen[1]

              return (
                <Link key={id} href={`/producto/${id}`} className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                    <div className="relative w-full h-150">
                      <img
                        src={imagenPrincipal}
                        alt={nombre}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          imagenHover ? 'group-hover:opacity-0' : ''
                        }`}
                      />
                      {imagenHover && (
                        <img
                          src={imagenHover}
                          alt={`${nombre} alternativa`}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
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

      <div
        className="bg-black text-white py-4"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        <marquee behavior="scroll" direction="left" scrollamount="6" loop="0">
          <span className="mx-8 text-xl font-semibold">
            TUS COMPRAS CON 3 Y 6 CUOTAS <strong className="text-2xl">SIN INTERESES</strong> ¡VÁLIDO CON TODAS LAS TARJETAS!
          </span>
        </marquee>
      </div>
      {productoAleatorio && (
        <div className="bg-white text-black py-16">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/3">
              <img
                src={productoAleatorio.imagen[0]}
                alt={productoAleatorio.nombre}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="lg:w-2/3 text-center lg:text-left px-8">
              <h3 className="uppercase tracking-wide text-gray-500 text-lg font-semibold">
                Producto Destacado
              </h3>
              <h2 className="text-4xl font-bold text-black mt-4">
                {productoAleatorio.nombre}
              </h2>
              <p className="text-gray-700 mt-4">{productoAleatorio.descripcion}</p>
              <p className="text-black text-2xl font-bold mt-6">${productoAleatorio.precio}</p>
              <Link
                href={`/producto/${productoAleatorio.id}`}
                className="btn-animated w-50 p-10"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                Ver Producto
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
