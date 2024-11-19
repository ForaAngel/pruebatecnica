import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import TableMembers from "@/components/TableMembers";
import ButtonSignin from "@/components/ButtonSignin";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300">
      {/* Header responsive */}
      <header className="bg-base-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl text-primary-content">
                  {session.user.name.charAt(0)}
                </span>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p className="text-sm text-base-content/60">
                  {session.user.email}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <ButtonSignin />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Sección de bienvenida responsive */}
        <div className="bg-base-100 rounded-box p-4 sm:p-6 shadow-lg mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center sm:justify-start gap-2">
                👋 Bienvenido, {session.user.name}
              </h1>
              <p className="text-sm sm:text-base text-base-content/60 mt-2">
                Gestiona los miembros de tu equipo desde aquí
              </p>
            </div>
            <div className="stats shadow w-full sm:w-auto">
              <div className="stat">
                <div className="stat-title">Miembros Totales</div>
                <div className="stat-value text-primary">0</div>
                <div className="stat-desc">Equipo actual</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Gestión de Usuarios responsive */}
        <div className="bg-base-100 rounded-box shadow-lg overflow-x-auto">
          <div className="p-4 sm:p-6">
            <TableMembers />
          </div>
        </div>
      </main>
    </div>
  );
}
