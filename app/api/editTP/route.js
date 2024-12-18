const { prisma } = require('../../lib/db.js');

export async function PUT(req) {
  try {
    const data = await req.json();

    const {
      id_tp,
      tp_number,
      tp_description,
      note,
    } = {
      ...data,
      tp_number: parseInt(data.tp_number, 10),
    };

    if (!id_tp || !tp_number || !tp_description) {
      return new Response(
        JSON.stringify({ error: "ข้อมูลหาย" }),
        { status: 400 }
      );
    }

    const updatedTestPoint = await prisma.TEST_POINT.update({
      where: { id_tp: id_tp },
      data: {
        tp_number,
        tp_description,
        note,
      },
    });

    return new Response(JSON.stringify(updatedTestPoint), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "เกิดข้อผิดพลาด ในการอัปเดต" }),
      { status: 500 }
    );
  }
}
