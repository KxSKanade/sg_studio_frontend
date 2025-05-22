import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-black shadow">
      <div className="text-lg font-bold">Mi Tienda</div>
      <ul className="flex gap-4">
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/ropa">Ropa</Link></li>
        <li><Link href="/registro">Registrarse</Link></li>
        <li><Link href="/carrito">Carrito</Link></li>
      </ul>
    </nav>
  );
}
