'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { FaUser, FaSearch, FaShoppingBag, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  const bgClass = scrolled || hovered || showSearch
    ? 'bg-white text-black shadow-md border-b'
    : 'bg-transparent text-white';

  const clearSearch = () => setSearchTerm('');

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-8 py-4 transition-all duration-300 ${bgClass}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
            CIAO BELLA
          </Link>

          <ul className="flex gap-6 text-sm font-medium">
            <li className="relative group">
              <Link href="/woman" className="underline-hover">WOMAN</Link>
              <div
                className="
                  absolute left-0 top-full mt-0 w-64 bg-white shadow-lg p-4 hidden group-hover:block border text-sm z-30
                  before:content-[''] before:absolute before:top-0 before:left-0 before:h-[3px] before:bg-pink-500
                  before:w-0 before:origin-left before:transition-all before:duration-500 before:ease-in-out
                  group-hover:before:w-full
                "
              >
                <ul className="space-y-1 text-black">
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

            <li><Link href="/man" className="underline-hover">MAN</Link></li>
            <li><Link href="/new" className="underline-hover">NEW ARRIVALS</Link></li>
            <li><Link href="/top" className="underline-hover">TOP SELLERS</Link></li>
            <li><Link href="/basics" className="underline-hover">BASICS</Link></li>
            <li><Link href="/last" className="underline-hover">LAST UNITS</Link></li>
            <li><Link href="/todo" className="underline-hover">VER TODO</Link></li>
          </ul>

          <div className="flex gap-4 text-xl">
            <Link href="/registro"><FaUser className="hover:text-pink-500" /></Link>

            <button
              ref={buttonRef}
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label="Buscar"
              className="hover:text-pink-500 focus:outline-none"
              type="button"
            >
              <FaSearch />
            </button>

            <Link href="/carrito"><FaShoppingBag className="hover:text-pink-500" /></Link>
          </div>
        </div>
      </nav>

      {showSearch && (
        <div
          ref={searchRef}
          className="fixed top-[64px] left-0 w-full bg-white z-40 shadow-md border-b px-8 py-3 flex items-center max-w-full"
        >
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-2 py-2 text-black placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Limpiar búsqueda"
              className="text-gray-500 hover:text-gray-700 ml-3"
            >
              <FaTimes size={20} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
