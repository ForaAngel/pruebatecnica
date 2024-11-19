import { connectDB } from "@/libs/mongo";
import Member from "@/models/Member";
import bcrypt from "bcryptjs";

// GET - Obtener todos los miembros
export async function GET() {
  try {
    await connectDB();
    // Usamos select('-password') para excluir la contraseña de la respuesta
    const members = await Member.find({}).select("-password");
    return Response.json(members);
  } catch (error) {
    console.error("Error in GET /api/members:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - Crear nuevo miembro
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    await connectDB();

    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const member = await Member.create({
      name,
      email,
      password: hashedPassword,
    });

    // Eliminamos la contraseña del objeto de respuesta
    const { password: _, ...memberWithoutPassword } = member.toObject();
    return Response.json(memberWithoutPassword);
  } catch (error) {
    console.error("Error in POST /api/members:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
