'use client';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">Iniciar Sesión</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-pink-500 hover:underline">Regístrate</Link>
        </div>

        <div className="mt-2 text-center text-sm">
          <Link href="/recuperar" className="text-pink-400 hover:underline">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </main>
  );
}
