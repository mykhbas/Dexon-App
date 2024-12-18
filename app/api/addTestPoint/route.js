const { prisma } = require('../../lib/db.js');

export async function POST(req) {
    const data = await req.json();
    const { 
        tp_number,
        tp_description,
        note,
        id_cml
    } = {
        ...data,
        tp_number: parseInt(data.tp_number, 10),
        id_cml: parseInt(data.id_cml, 10),
    };
    try {
        const newTestPoint = await prisma.TEST_POINT.create({
            data: {
                tp_number,
                tp_description,
                note,
                id_cml,
            },
        });

        return new Response(
            JSON.stringify(newTestPoint),
            {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'เกิดข้อผิดพลาด' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
