'use client';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white pt-24">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg border">
        <h2 className="text-2xl text-center text-black mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Iniciar sesión</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-animated w-full"style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-black hover:underline">Regístrate</Link>
        </div>

        <div className="mt-2 text-center text-sm">
          <Link href="/recuperar" className="text-gray-600 hover:underline">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </main>
  );
}
