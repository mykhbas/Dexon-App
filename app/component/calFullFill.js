const pipeOutsideDiameters = [
  { size: 0.125, diameter: 10.3 },
  { size: 0.25, diameter: 13.7 },
  { size: 0.357, diameter: 17.1 },
  { size: 0.5, diameter: 21.3 },
  { size: 0.75, diameter: 26.7 },
  { size: 1.0, diameter: 33.4 },
  { size: 1.25, diameter: 42.2 },
  { size: 1.5, diameter: 48.3 },
  { size: 2.0, diameter: 60.3 },
  { size: 2.5, diameter: 73.0 },
  { size: 3.0, diameter: 88.9 },
  { size: 3.5, diameter: 101.6 },
  { size: 4.0, diameter: 114.3 },
  { size: 5.0, diameter: 141.3 },
  { size: 6.0, diameter: 168.3 },
  { size: 8.0, diameter: 219.1 },
  { size: 10.0, diameter: 273.0 },
  { size: 12.0, diameter: 323.8 },
  { size: 14.0, diameter: 355.6 },
  { size: 16.0, diameter: 406.4 },
  { size: 18.0, diameter: 457.0 },
];

const structuralThicknesses = [
  { size: 2, thickness: 1.8 },
  { size: 3, thickness: 2.0 },
  { size: 4, thickness: 2.3 },
  { size: 18, thickness: 2.8 },
  { size: 20, thickness: 3.1 },
];

export const calculatePipeData = (pipeSize, designPressure, stress, jointEfficiency) => {
  const calculateActualDiameter = (pipeSize) => {
    const pipe = pipeOutsideDiameters.find((p) => p.size === parseFloat(pipeSize));
    return pipe ? pipe.diameter : null;
  };

  const calculateDesignThickness = (pressure, diameter, stress, efficiency) => {
    const numerator = pressure * diameter;
    const denominator = 2 * stress * efficiency + 2 * pressure * 0.4;
    return numerator / denominator;
  };

  const getStructuralThickness = (pipeSize) => {
    const thickness = structuralThicknesses.find((t) => pipeSize <= t.size);
    return thickness ? thickness.thickness : null;
  };

  const actualOutsideDiameter = calculateActualDiameter(pipeSize);
  if (!actualOutsideDiameter) {
    return { error: "Invalid pipe size." };
  }

  const designThickness = calculateDesignThickness(
    parseFloat(designPressure),
    actualOutsideDiameter,
    parseFloat(stress),
    parseFloat(jointEfficiency)
  );

  const structuralThickness = getStructuralThickness(pipeSize);
  const requiredThickness = Math.max(designThickness, structuralThickness || 0);

  return {
    actualOutsideDiameter: actualOutsideDiameter.toFixed(2),
    designThickness: designThickness.toFixed(2),
    structuralThickness: structuralThickness ? structuralThickness.toFixed(2) : "N/A",
    requiredThickness: requiredThickness.toFixed(2),
  };
};



