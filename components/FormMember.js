"use client";

import { useState } from "react";
import toast from "react-hot-toast";

function FormMember({ member, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    email: member?.email || "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const url = member ? `/api/members/${member._id}` : "/api/members";
    const method = member ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const successMessage = member
          ? "Miembro actualizado correctamente"
          : "Miembro creado correctamente";
        onSuccess(successMessage);
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al procesar la solicitud");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-200 rounded-xl shadow-xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="border-b border-base-300 p-4">
          <h3 className="text-xl font-bold text-base-content">
            {member ? "✏️ Editar Miembro" : "➕ Nuevo Miembro"}
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Nombre */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Nombre</span>
            </label>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              className="input input-bordered w-full bg-white text-gray-900 focus:input-primary"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="input input-bordered w-full bg-white text-gray-900 focus:input-primary"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Contraseña */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Contraseña</span>
              {member && (
                <span className="label-text-alt text-base-content/60">
                  Dejar vacío para mantener la actual
                </span>
              )}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full bg-white text-gray-900 focus:input-primary"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!member}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t border-base-300">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost hover:btn-error"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : member ? (
                <span className="flex items-center gap-2">
                  Actualizar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Crear
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormMember;
