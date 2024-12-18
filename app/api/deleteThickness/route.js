import { prisma } from '../../lib/db.js';

export async function DELETE(req) {
  try {
    const { id_thickness } = await req.json();
    const deletedThicknesses = await prisma.THICKNESS.deleteMany({
      where: {
        id_thickness: id_thickness, 
      },
    });

    return new Response(
      JSON.stringify({
        deletedThicknesses,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {

    return new Response(
      JSON.stringify({ error: 'เกิดข้อผิดพลาด' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
