const { prisma } = require('../../lib/db.js');

export async function POST(req) {
  try {
    const { id_cml} = await req.json();
    const id_cmlInt = parseInt(id_cml, 10);
    const tpData = await prisma.TEST_POINT.findMany({
      where: {
        id_cml: id_cmlInt,
      },
      
    });

    if (!tpData.length) {
      return new Response(JSON.stringify([]), { status: 200 });

    }

    return new Response(JSON.stringify(tpData), { status: 200 });
  } catch (error) {

    return new Response(JSON.stringify({ error: 'เกิดข้อผิดพลาด' }), {
      status: 500,
    });
  }
}
