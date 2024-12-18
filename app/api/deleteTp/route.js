const { prisma } = require('../../lib/db.js');

export async function DELETE(req) {
  try {
    const { id_tp } = await req.json();

    const deletedThicknesses = await prisma.THICKNESS.deleteMany({
      where: {
        id_tp: id_tp, 
      },
    });

    const deletedTestPoint = await prisma.TEST_POINT.delete({
      where: {
        id_tp: id_tp,
      },
    });

    return new Response(
      JSON.stringify({
        deletedTestPoint,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'ข้อมูลที่ส่งมาผิด' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
