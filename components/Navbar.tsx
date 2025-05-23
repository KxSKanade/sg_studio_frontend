'use client';
import Link from 'next/link';
import { FaUser, FaSearch, FaShoppingBag } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="relative z-20 flex justify-between items-center px-8 py-4 border-b bg-white">
      {/* IZQUIERDA: Logo */}
      <div className="text-2xl font-bold">LUVARO</div>

      {/* CENTRO: Menú horizontal */}
      <ul className="flex gap-6 text-sm font-medium text-black">
        {/* WOMAN con submenú */}
        <li className="relative group">
          <Link href="/woman" className="underline-hover">WOMAN</Link>

          {/* SUBMENÚ */}
          {/* SUBMENÚ */}
<div
  className="
    absolute left-0 top-full mt-0 w-64 bg-white shadow-lg p-4 hidden group-hover:block border text-sm z-30
    before:content-[''] before:absolute before:top-0 before:left-0 before:h-[3px] before:bg-pink-500
    before:w-0 before:origin-left before:transition-all before:duration-500 before:ease-in-out
    group-hover:before:w-full
  "
>
  <ul className="space-y-1">
    <li><Link href="/ropa/tops" className="block hover:text-pink-500">Tops</Link></li>
    <li><Link href="/ropa/polos" className="block hover:text-pink-500">Polos</Link></li>
    <li><Link href="/ropa/blusas" className="block hover:text-pink-500">Blusas</Link></li>
    <li><Link href="/ropa/bodies" className="block hover:text-pink-500">Bodies</Link></li>
    <li><Link href="/ropa/vestidos" className="block hover:text-pink-500">Vestidos</Link></li>
    <li><Link href="/ropa/abrigos" className="block hover:text-pink-500">Abrigos, blazers</Link></li>
    <li><Link href="/ropa/pantalones" className="block hover:text-pink-500">Pantalones</Link></li>
    <li><Link href="/ropa/denim" className="block hover:text-pink-500">Denim</Link></li>
    <li><Link href="/ropa/faldas" className="block hover:text-pink-500">Faldas</Link></li>
    <li><Link href="/ropa/shorts" className="block hover:text-pink-500">Short</Link></li>
  </ul>
</div>


        </li>

        {/* Otros items del menú */}
        <li><Link href="/man">MAN</Link></li>
        <li><Link href="/new">NEW ARRIVALS</Link></li>
        <li><Link href="/top">TOP SELLERS</Link></li>
        <li><Link href="/basics">BASICS</Link></li>
        <li><Link href="/last">LAST UNITS</Link></li>
        <li><Link href="/todo">VER TODO</Link></li>
      </ul>

      {/* DERECHA: Iconos */}
      <div className="flex items-center gap-6">
        <div className="flex gap-4 text-xl">
          <Link href="/registro"><FaUser className="hover:text-pink-500" /></Link>
          <Link href="/buscar"><FaSearch className="hover:text-pink-500" /></Link>
          <Link href="/carrito"><FaShoppingBag className="hover:text-pink-500" /></Link>
        </div>
        <div className="hidden md:flex flex-col text-xs text-right">
          <Link href="/registro" className="hover:underline">REGISTRARSE</Link>
          <Link href="/buscar" className="hover:underline">BUSCAR</Link>
          <Link href="/carrito" className="hover:underline">COMPRAR</Link>
        </div>
      </div>
    </nav>
  );
}
