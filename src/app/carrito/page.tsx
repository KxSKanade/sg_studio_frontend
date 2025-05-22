export default function CarritoPage() {
  const carrito = [
    { id: 1, nombre: 'Top Blanco', cantidad: 2, precio: 49.90 },
    { id: 2, nombre: 'Falda Denim', cantidad: 1, precio: 59.90 },
  ];

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
      {carrito.map(item => (
        <div key={item.id} className="flex justify-between border-b py-4">
          <span>{item.nombre} (x{item.cantidad})</span>
          <span>${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
      ))}
      <div className="text-right mt-6 font-semibold text-xl">
        Total: ${total.toFixed(2)}
      </div>
      <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-pink-600">
        Finalizar compra
      </button>
    </div>
  );
}
