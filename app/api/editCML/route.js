const { prisma } = require('../../lib/db.js');

export async function PUT(req) {
    const data = await req.json();
    const {
      id_cml,
      cml_number,
      cml_description,
      actual_outside_diameter,
      design_thickness,
      structural_thickness,
      required_thickness,
    } = {
      ...data,
      cml_number:parseInt(data.cml_number),
      actual_outside_diameter: parseFloat(data.actual_outside_diameter), 
      design_thickness: parseFloat(data.design_thickness), 
      structural_thickness: parseFloat(data.structural_thickness), 
      required_thickness: parseFloat(data.required_thickness),
    };
    try {
      const updatedCML = await prisma.cML.update({
        where: { id_cml: id_cml },
        data: {
          cml_number,
          cml_description,
          actual_outside_diameter,
          design_thickness,
          structural_thickness,
          required_thickness,
        },
      });
    
      return new Response(
        JSON.stringify(updatedCML),
        {
          status: 200, 
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'เกิดข้อผิดพลาด ในการ อัปเดต' }),
        {
          status: 500, 
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
}
