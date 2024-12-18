const { prisma } = require('../../lib/db.js');

export async function POST(req) {
  try {
    const { id_tp } = await req.json();
    const id_tpInt = parseInt(id_tp, 10);

    const thicknessData = await prisma.THICKNESS.findMany({
      where: {
        id_tp: id_tpInt,
      },
      
    });

    if (!thicknessData.length) {
      return new Response(JSON.stringify([]), { status: 200 });

    }

    return new Response(JSON.stringify(thicknessData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'เกิดข้อผิดพลาด' }), {
      status: 500,
    });
  }
}
