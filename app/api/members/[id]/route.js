import { connectDB } from "@/libs/mongo";
import Member from "@/models/Member";
import bcrypt from "bcryptjs";

// GET - Obtener miembro existente
export async function GET(request, { params }) {
  try {
    const id = await params.id;
    await connectDB();

    const member = await Member.findById(id).select("-password");
    if (!member) {
      return Response.json({ error: "Miembro no encontrado" }, { status: 404 });
    }

    return Response.json(member);
  } catch (error) {
    console.error("Error in GET /api/members/[id]:", error);
    return Response.json(
      { error: "Error al obtener el miembro" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar miembro existente
export async function PUT(request, { params }) {
  try {
    const id = await params.id;
    const { name, email, password } = await request.json();
    await connectDB();

    const updateData = { name, email };

    // Solo actualizamos la contraseña si se proporciona una nueva
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const member = await Member.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Retorna el documento actualizado
    ).select("-password");

    if (!member) {
      return Response.json({ error: "Miembro no encontrado" }, { status: 404 });
    }

    return Response.json(member);
  } catch (error) {
    console.error("Error in PUT /api/members/[id]:", error);
    return Response.json(
      { error: "Error al actualizar el miembro" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar miembro
export async function DELETE(request, { params }) {
  try {
    const id = await params.id;
    await connectDB();

    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      return Response.json({ error: "Miembro no encontrado" }, { status: 404 });
    }

    return Response.json({ message: "Miembro eliminado correctamente" });
  } catch (error) {
    console.error("Error in DELETE /api/members/[id]:", error);
    return Response.json(
      { error: "Error al eliminar el miembro" },
      { status: 500 }
    );
  }
}
