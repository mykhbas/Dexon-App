const { prisma } = require('../../lib/db.js');

export async function POST(req) {
  try {
    const { line_number } = await req.json();

    const cmlData = await prisma.CML.findMany({
      where: {
        line_number: line_number,
      },
      
    });

    if (!cmlData.length) {
      return new Response(JSON.stringify({}), { status: 200 });

    }

    return new Response(JSON.stringify(cmlData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'เกิดข้อผิดพลาด' }), {
      status: 500,
    });
  }
}
