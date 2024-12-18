const { prisma } = require('../../lib/db.js');

export async function POST(req) {
    const data = await req.json();

    const {
        line_number,
        location,
        from,
        to,
        service,
        material,
        drawing,
        pipe_size,
        inservice_date,
        original_thickness,
        stress,
        joint_efficiency,
        ca,
        design_life,
        design_pressure,
        operating_pressure,
        design_temperature,
        operating_temperature,
        oldLine_number,
    } = {
        ...data,
        pipe_size: parseFloat(data.pipe_size),
        inservice_date: new Date(data.inservice_date),
        original_thickness: parseFloat(data.original_thickness),
        stress: parseInt(data.stress, 10),
        joint_efficiency: parseFloat(data.joint_efficiency),
        ca: parseInt(data.ca, 10),
        design_life: parseInt(data.design_life, 10),
        design_pressure: parseInt(data.design_pressure, 10),
        operating_pressure: parseInt(data.operating_pressure, 10),
        design_temperature: parseInt(data.design_temperature, 10),
        operating_temperature: parseInt(data.operating_temperature, 10),
    };

    try {
        const updatedPiping = await prisma.INFO.update({
            where: {
                line_number: oldLine_number, 
            },
            data: {
                location,
                from,
                to,
                pipe_size,
                service,
                material,
                inservice_date,
                original_thickness,
                stress,
                joint_efficiency,
                ca,
                design_life,
                design_pressure,
                operating_pressure,
                design_temperature,
                operating_temperature,
                drawing,
                line_number, 
            },
        });
        
        return new Response(
            JSON.stringify(updatedPiping),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error(error); 
        return new Response(
            JSON.stringify({ error: 'เกิดข้อผิดพลาด ในการอัปเดต' }),
            {
                status: 500, 
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
