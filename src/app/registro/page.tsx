export default function RegistroPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Nombre" className="input" />
        <input type="text" placeholder="Apellidos" className="input" />
        <input type="email" placeholder="Correo electrónico" className="input" />
        <input type="tel" placeholder="Teléfono (opcional)" className="input" />
        <input type="password" placeholder="Contraseña" className="input" />
        <button className="btn-primary">Registrarse</button>
      </form>
    </div>
  );
}
