const { prisma } = require('../../lib/db.js');

export async function POST(req) {
  const data = await req.json();
  const { 
    id_tp, 
    inspection_date, 
    actual_thickness 
  } = {
    ...data,
    id_tp: parseInt(data.id_tp, 10),
  };

  try {
    const newThickness = await prisma.THICKNESS.create({
      data: {
        id_tp,
        inspection_date: new Date(inspection_date), 
        actual_thickness: parseFloat(actual_thickness), 
      },
    });

    return new Response(
      JSON.stringify(newThickness),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'เกิดข้อผิดพลาด.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
