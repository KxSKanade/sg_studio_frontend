//admin/dashboard/components/CrearProductoForm

'use client';

import { useEffect, useState } from 'react';

export default function CrearProductoForm() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [mensaje, setMensaje] = useState([]);
  const [color, setColor] = useState('');
  const [talla, setTalla] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [composicion, setComposicion] = useState('');
  const [info, setInfo] = useState('');
  const [cuidados, setCuidados] = useState('');


  useEffect(() => {
    // Cargar categorías al montar el componente
    const fetchCategorias = async () => {
      try {
        const res = await fetch('https://sg-studio-backend.onrender.com/categorias');
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !categoriaId ||!color ||!talla ||!cantidad ||!composicion ||!info ||!cuidados) {
      setMensaje('Por favor, completa los campos requeridos');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('categoriaId', categoriaId);
    formData.append('color', color);
    formData.append('talla', talla);
    formData.append('cantidad', cantidad);
    formData.append('composicion', composicion);
    formData.append('info', info);
    formData.append('cuidados', cuidados);
    imagenes.forEach((img) => formData.append('imagen', img));

    try {
      const res = await fetch('https://sg-studio-backend.onrender.com/productos', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setMensaje(data.error || 'Error al crear producto');
        return;
      }

      setMensaje(`Producto "${data.nombre}" creado con éxito!`);
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCategoriaId('');
      setColor('');
      setTalla('');
      setCantidad('');
      setComposicion('');
      setInfo('');
      setCuidados('');
      setImagen(null);
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
      console.error(error);
    }
  };
  return (
    <div
      className="rounded-xl p-8 shadow-md mt-12 max-w-4xl mx-auto"
      style={{
        backgroundColor: '#F1EDE2',
        color: '#A68461',
        fontFamily: "'Adelle Sans Devanagari', sans-serif"
      }}
    >
      <h3
        className="text-3xl font-bold mb-6 text-center"
        style={{
          fontFamily: "'Beige Culture', serif",
          color: '#A68461'
        }}
      >
        Crear Nuevo Producto
      </h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna 1 */}
        <div className="space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre *"
            required
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />

          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            rows={3}
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />

          <textarea
            value={composicion}
            onChange={(e) => setComposicion(e.target.value)}
            placeholder="Composición"
            rows={2}
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />

          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Información adicional"
            rows={2}
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />
        </div>

        {/* Columna 2 */}
        <div className="space-y-4">
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color *"
            required
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />

          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Cantidad *"
            required
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />

          <textarea
            value={cuidados}
            onChange={(e) => setCuidados(e.target.value)}
            placeholder="Cuidados"
            rows={2}
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />

          <textarea
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
            placeholder="Talla"
            rows={2}
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />
        </div>

        {/* Campos que abarcan todo el ancho */}
        <div className="md:col-span-2 space-y-4">
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio *"
            required
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] placeholder-[#A68461] focus:outline-none"
          />

          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-[#E2D6C6] bg-[#F7F1EC] text-[#A68461] focus:outline-none"
          >
            <option value="">Selecciona una categoría *</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImagenes(Array.from(e.target.files))}
            className="w-full text-sm text-[#A68461]"
          />


          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md font-semibold transition"
            style={{
              backgroundColor: '#A68461',
              color: '#F7F1EC'
            }}
          >
            Crear Producto
          </button>

          {mensaje && <p className="text-center mt-4 text-sm">{mensaje}</p>}
        </div>
      </form>
    </div>
  );

}
