function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Bienvenido a mi Aplicación
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Esta es una aplicación de prueba usando Next.js, MongoDB y NextAuth
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;