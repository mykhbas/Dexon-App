const { prisma } = require('../../lib/db.js');
import { calculatePipeData } from '../../component/calFullFill.js';

export async function PUT(req) {
  const data = await req.json();
  const { line_number, pipe_size, design_pressure, stress, joint_efficiency } = data;

  const parsedPipeSize = parseFloat(pipe_size);
  const parsedDesignPressure = parseFloat(design_pressure);
  const parsedStress = parseFloat(stress);
  const parsedJointEfficiency = parseFloat(joint_efficiency);

  if (!line_number || isNaN(parsedPipeSize) || isNaN(parsedDesignPressure) || isNaN(parsedStress) || isNaN(parsedJointEfficiency)) {
    return new Response(
      JSON.stringify({ message: 'Missing or invalid required fields' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const cmlRecords = await prisma.CML.findMany({
      where: { line_number: line_number },
    });

    await Promise.all(
      cmlRecords.map(async (cml) => {
        const updatedData = calculatePipeData(parsedPipeSize, parsedDesignPressure, parsedStress, parsedJointEfficiency);
        await prisma.CML.update({
          where: { id_cml: cml.id_cml },
          data: {
            actual_outside_diameter: parseFloat(updatedData.actualOutsideDiameter),
            design_thickness: parseFloat(updatedData.designThickness),
            structural_thickness: parseFloat(updatedData.structuralThickness),
            required_thickness: parseFloat(updatedData.requiredThickness),
          }
        });
      })
    );

    return new Response(
      JSON.stringify({ message: 'สำเร็จ' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating pipe size and CML records:', error);

    return new Response(
      JSON.stringify({ message: 'เกิดข้อผิดพลาด' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
