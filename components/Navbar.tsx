'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { FaUser, FaSearch, FaShoppingBag, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const searchRef = useRef(null);
  const buttonRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutsideSearch = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutsideSearch);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    }
    return () => document.removeEventListener('mousedown', handleClickOutsideSearch);
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutsideCart = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };
    if (showCart) {
      document.addEventListener('mousedown', handleClickOutsideCart);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideCart);
    }
    return () => document.removeEventListener('mousedown', handleClickOutsideCart);
  }, [showCart]);

  const bgClass = scrolled || hovered || showSearch
    ? 'bg-white text-black shadow-md border-b border-gray-300'
    : 'bg-transparent text-white border-b border-transparent';

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
              <div className="absolute left-0 top-full mt-0 w-64 bg-white shadow-lg p-4 hidden group-hover:block border text-sm z-30">
                <ul className="space-y-1 text-black">
                  <li><Link href="/ropa/tops">Tops</Link></li>
                  <li><Link href="/ropa/polos">Polos</Link></li>
                  <li><Link href="/ropa/blusas">Blusas</Link></li>
                  <li><Link href="/ropa/bodies">Bodies</Link></li>
                  <li><Link href="/ropa/vestidos">Vestidos</Link></li>
                  <li><Link href="/ropa/abrigos">Abrigos, blazers</Link></li>
                  <li><Link href="/ropa/pantalones">Pantalones</Link></li>
                  <li><Link href="/ropa/denim">Denim</Link></li>
                  <li><Link href="/ropa/faldas">Faldas</Link></li>
                  <li><Link href="/ropa/shorts">Short</Link></li>
                </ul>
              </div>
            </li>
            <li><Link href="/new">NEW ARRIVALS</Link></li>
            <li><Link href="/top">TOP SELLERS</Link></li>
            <li><Link href="/basics">BASICS</Link></li>
            <li><Link href="/last">LAST UNITS</Link></li>
            <li><Link href="/todo">VER TODO</Link></li>
          </ul>

          <div className="flex gap-4 text-xl">
            <Link href="/login"><FaUser className="hover:text-pink-500" /></Link>
            <button
              ref={buttonRef}
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label="Buscar"
              className="hover:text-pink-500 focus:outline-none"
              type="button"
            >
              <FaSearch />
            </button>
            <button
              onClick={() => setShowCart(true)}
              aria-label="Carrito"
              className="hover:text-pink-500 focus:outline-none"
              type="button"
            >
              <FaShoppingBag />
            </button>
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

      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-full max-w-sm w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-bold text-black">Tu carrito</h2>
          <button onClick={() => setShowCart(false)} aria-label="Cerrar">
            <FaTimes className="text-black" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-black">Tu carrito está vacío.</p>
        </div>
      </div>
    </>
  );
}
