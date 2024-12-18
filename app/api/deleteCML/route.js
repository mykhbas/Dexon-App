const { prisma } = require('../../lib/db.js');

export async function DELETE(req) {
  try {
    const { id_cml } = await req.json(); 
   
    const deletedThicknesses = await prisma.THICKNESS.deleteMany({
        where: {
          test_point: {
            id_cml: id_cml, 
          },
        },
      });

    const deletedTestPoints = await prisma.TEST_POINT.deleteMany({
      where: {
        id_cml: id_cml,
      },
    });

    const deletedCML = await prisma.CML.delete({
      where: {
        id_cml: id_cml, 
      },
    });

    return new Response(
        JSON.stringify({
            deletedCML,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'ข้อมูลผิดพลาด' }), {
      status: 500,
    });
  }
}
