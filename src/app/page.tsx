'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const images = ['/images/7.png', '/images/8.png']

export default function Home() {
  const [index, setIndex] = useState(0) 

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      {/* HERO con imagen de fondo que ocupa toda la pantalla */}
      <section className="w-full h-screen relative overflow-hidden">
        <Image
          src={images[index]}
          alt={`Slide ${index + 1}`}
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
{/* CONTENIDO DEBAJO */}
<section className="p-12 bg-white">
  <h2 className="text-2xl font-bold mb-2">SECCIÓN: <span className="text-blue-900">ROPA</span></h2>
  <p className="text-gray-700 mb-8 text-lg">Primera vista</p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {/* Producto 1 */}
    <div className="text-center">
      <img src="/images/5.png" alt="Producto 1" className="w-full h-auto rounded shadow" />
      <p className="mt-2 text-gray-600 text-sm">Cazadora Overshirt</p>
      <p className="font-semibold text-sm text-black">$29.99</p>
    </div>

    {/* Producto 2 */}
    <div className="text-center">
      <img src="/images/2.jpg" alt="Producto 2" className="w-full h-auto rounded shadow" />
      <p className="mt-2 text-gray-600 text-sm">Vestido Estampado</p>
      <p className="font-semibold text-sm text-black">$39.99</p>
    </div>

    {/* Producto 3 */}
    <div className="text-center">
      <img src="/images/3.jpg" alt="Producto 3" className="w-full h-auto rounded shadow" />
      <p className="mt-2 text-gray-600 text-sm">Pantalón Jeans Wide Leg</p>
      <p className="font-semibold text-sm text-black">$34.99</p>
    </div>

    {/* Producto 4 */}
    <div className="text-center">
      <img src="/images/4.jpg" alt="Producto 4" className="w-full h-auto rounded shadow" />
      <p className="mt-2 text-gray-600 text-sm">Top Corset Chocolate</p>
      <p className="font-semibold text-sm text-black">$19.99</p>
    </div>
  </div>
</section>

    </main>
  )
}
