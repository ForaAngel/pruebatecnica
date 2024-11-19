"use client";

import { useState, useEffect } from "react";
import FormMember from "./FormMember";
import toast from "react-hot-toast";

function TableMembers() {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchMembers() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/members");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMembers(data);
      } else if (data.error) {
        setError(data.error);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("Error al cargar los miembros");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(memberId) {
    if (confirm("¿Estás seguro de eliminar este miembro?")) {
      try {
        const res = await fetch(`/api/members/${memberId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          toast.success("Miembro eliminado correctamente");
          fetchMembers();
        } else {
          toast.error("Error al eliminar el miembro");
        }
      } catch (error) {
        console.error("Error deleting member:", error);
        toast.error("Error al eliminar el miembro");
      }
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold">
                Gestión de Miembros
              </h2>
              <div className="badge badge-primary">{members.length}</div>
            </div>
            <button
              onClick={() => {
                setSelectedMember(null);
                setIsModalOpen(true);
              }}
              className="btn btn-primary btn-sm gap-2 w-full sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Nuevo Miembro
            </button>
          </div>

          {members.length === 0 ? (
            <div className="alert alert-info">
              <span>No hay miembros registrados. ¡Añade uno nuevo!</span>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-base-300">
                    <thead>
                      <tr className="border-b border-base-300">
                        <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold">
                          Nombre
                        </th>
                        <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold">
                          Email
                        </th>
                        <th className="px-3 py-3 sm:px-6 sm:py-4 text-right text-xs sm:text-sm font-semibold">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-base-300">
                      {members.map((member) => (
                        <tr
                          key={member._id}
                          className="hover:bg-base-200/50 transition-colors"
                        >
                          <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm whitespace-nowrap">
                            {member.name}
                          </td>
                          <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-primary hidden sm:block"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              <span className="truncate max-w-[150px] sm:max-w-none">
                                {member.email}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3 sm:px-6 sm:py-4 text-right whitespace-nowrap">
                            <div className="flex justify-end gap-1 sm:gap-2">
                              <button
                                onClick={() => {
                                  setSelectedMember(member);
                                  setIsModalOpen(true);
                                }}
                                className="btn btn-ghost btn-xs sm:btn-sm"
                                aria-label="Editar"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(member._id)}
                                className="btn btn-ghost btn-xs sm:btn-sm text-error"
                                aria-label="Eliminar"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <FormMember
          member={selectedMember}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMember(null);
          }}
          onSuccess={(message) => {
            setIsModalOpen(false);
            setSelectedMember(null);
            fetchMembers();
            toast.success(message);
          }}
        />
      )}
    </>
  );
}

export default TableMembers;
