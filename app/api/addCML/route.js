const { prisma } = require('../../lib/db.js');

export async function POST(req) {
    const data = await req.json();
    const { 
        cml_number,
        cml_description, 
        actual_outside_diameter, 
        design_thickness, 
        structural_thickness, 
        required_thickness,
        lineNumber
    } = {
        ...data,
        cml_number: parseInt(data.cml_number, 10),
        actual_outside_diameter: parseFloat(data.actual_outside_diameter),
        design_thickness: parseFloat(data.design_thickness),
        structural_thickness: parseFloat(data.structural_thickness),
        required_thickness: parseFloat(data.required_thickness),
    };

    try {
        const line_number = lineNumber
        const newCML = await prisma.CML.create({
            data: {
                cml_number,
                cml_description,
                actual_outside_diameter,
                design_thickness,
                structural_thickness,
                required_thickness,
                line_number
            },
        });
        return new Response(
            JSON.stringify(newCML),
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
