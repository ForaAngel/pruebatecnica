"use client";

import { useState } from "react";

export default function ButtonChangeRole({ userId, currentRole }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleRoleUpdate() {
    setIsLoading(true);
    try {
      const newRole = currentRole === "user" ? "admin" : "user";
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      // Recargar la página para ver los cambios
      window.location.reload();
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className="text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
      onClick={handleRoleUpdate}
      disabled={isLoading}
    >
      {isLoading ? "Actualizando..." : "Cambiar rol"}
    </button>
  );
}
