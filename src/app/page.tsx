'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const images = ['/images/1.png', '/images/valo.png'];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <section className="w-full h-[400px] relative overflow-hidden">
        <Image
          src={images[index]}
          alt={`Slide ${index + 1}`}
          fill
          className="object-cover transition-all duration-500"
          priority
        />

        {/* ✅ Texto centrado correctamente dentro del section */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h5 className="text-white text-3xl drop-shadow-lg">
            ...
          </h5>
        </div>
      </section>
    </main>
  );
}
