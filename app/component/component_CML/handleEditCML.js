"use client"

import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import "../../styles/swal.css"

const UpdatedCML = ({ cmlData, setCmlData, id_cml,line_number }) => {
  const [description, setDescription] = useState(null);
  const [outsideDiameter, setOutsideDiameter] = useState(null);
  const [designThickness, setDesignThickness] = useState(null);
  const [structuralThickness, setStructuralThickness] = useState(null);
  const [requiredThickness, setRequiredThickness] = useState(null);
  const [cmlNumber, setCmlNumber] = useState(null);  
  useEffect(() => {
    const foundCml = cmlData.find(
      (cmlItem) => cmlItem.id_cml === id_cml && cmlItem.line_number === line_number
    );

    if (foundCml) {
      setDescription(foundCml.cml_description);
      setOutsideDiameter(foundCml.actual_outside_diameter);
      setDesignThickness(foundCml.design_thickness);
      setStructuralThickness(foundCml.structural_thickness);
      setRequiredThickness(foundCml.required_thickness);
      setCmlNumber(foundCml.cml_number); 
    }
  }, [cmlData, id_cml, line_number]);
  const openModal = () => {
    Swal.fire({
      title: "Edit CML Data",
      html: `
      <div class="swal2-input-container">
        <input id="cml_number" class="swal2-input" value="${cmlNumber}" placeholder="CML Number" type="number">
        <input id="description" class="swal2-input" value="${description}" placeholder="Description" type="text">
        <input id="outside_diameter" class="swal2-input" value="${outsideDiameter}" placeholder="Actual Outside Diameter (mm)" type="number" disabled>
        <input id="design_thickness" class="swal2-input" value="${designThickness}" placeholder="Design Thickness (mm)" type="number" disabled>
        <input id="structural_thickness" class="swal2-input" value="${structuralThickness}" placeholder="Structural Thickness (mm)" type="number" disabled>
        <input id="required_thickness" class="swal2-input" value="${requiredThickness}" placeholder="Required Thickness (mm)" type="number" disabled>
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const description = document.getElementById('description').value;
        const outsideDiameter = document.getElementById('outside_diameter').value;
        const designThickness = document.getElementById('design_thickness').value;
        const structuralThickness = document.getElementById('structural_thickness').value;
        const requiredThickness = document.getElementById('required_thickness').value;
        const cmlNumber = document.getElementById('cml_number').value; 

        return {
          description, outsideDiameter, designThickness, structuralThickness, requiredThickness, cmlNumber
        };
      },
      onCancel: () => setCmlData(null) 
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedCMLData = result.value;
        console.log(id_cml,updatedCMLData)
        try {
          const response = await fetch('../../api/editCML', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_cml: id_cml,
              cml_description: updatedCMLData.description,
              actual_outside_diameter: updatedCMLData.outsideDiameter,
              design_thickness: updatedCMLData.designThickness,
              structural_thickness: updatedCMLData.structuralThickness,
              required_thickness: updatedCMLData.requiredThickness,
              cml_number: updatedCMLData.cmlNumber,  
            }),
          });

          if (!response.ok) {
            throw new Error('อัปเดตล้มเหลวว');
          }

          const updatedCML = await response.json();

          setCmlData((prevData) =>
            prevData.map((cmlItem) =>
              cmlItem.id_cml === updatedCML.id_cml ? updatedCML : cmlItem
            )
          );

          Swal.fire('Success', 'อัปเดตแล้ว', 'success');
        } catch (error) {
          console.error('Error updating CML:', error);
          Swal.fire('Error', 'อัปเดตล้มเหลวว', 'error');
        }
      }
    });
  };

  return (
      <button onClick={openModal}>
        Edit
      </button>
  );
};

export default UpdatedCML;
