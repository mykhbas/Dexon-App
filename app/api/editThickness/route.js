const { prisma } = require('../../lib/db.js');

export async function PUT(req) {
  const data = await req.json();

  const {
    id_thickness,
    inspection_date,
    actual_thickness,
  } = {
    ...data,
    inspection_date: new Date(data.inspection_date), 
    actual_thickness: parseFloat(data.actual_thickness),
  };

  if (!id_thickness || !inspection_date || !actual_thickness) {
    return new Response(
      JSON.stringify({ error: "ข้อมูลหาย" }),
      { status: 400 }
    );
  }
  try {

    const updatedThickness = await prisma.THICKNESS.update({
      where: { id_thickness: id_thickness },
      data: {
        inspection_date,
        actual_thickness,
      },
    });

    return new Response(JSON.stringify(updatedThickness), {
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
