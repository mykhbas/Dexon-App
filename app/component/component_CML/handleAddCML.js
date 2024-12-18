import Swal from 'sweetalert2';
import { calculatePipeData } from '../calFullFill.js';
import "../../styles/swal.css"
const AddCML = ({ infoData,cmlData, setCmlData, lineNumber }) => {
  const handleAdd = () => {
    const lineInfo = infoData.find((item) => item.line_number === lineNumber);
    const showData = calculatePipeData(
      lineInfo.pipe_size, 
      lineInfo.design_pressure, 
      lineInfo.stress, 
      lineInfo.joint_efficiency 
    );
    console.log("show",showData)
    Swal.fire({
      title: 'Add CML',
      html: `
      <div class="swal2-input-container">
        <input id="cml_number" class="swal2-input" placeholder="CML Number" type="number">
        <input id="cml_description" class="swal2-input" placeholder="Description" type="text">
        <input id="actual_outside_diameter" class="swal2-input" placeholder="Actual Outside Diameter (mm)" type="number" value="${showData.actualOutsideDiameter}" disabled>
        <input id="design_thickness" class="swal2-input" placeholder="Design Thickness (mm)" type="number" value="${showData.designThickness}" disabled>
        <input id="structural_thickness" class="swal2-input" placeholder="Structural Thickness (mm)" type="number" value="${showData.structuralThickness}" disabled>
        <input id="required_thickness" class="swal2-input" placeholder="Required Thickness (mm)" type="number" value="${showData.requiredThickness}" disabled>
      </div>
        `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        const cml_number = document.getElementById('cml_number').value;
        const cml_description = document.getElementById('cml_description').value;
        const actual_outside_diameter = document.getElementById('actual_outside_diameter').value;
        const design_thickness = document.getElementById('design_thickness').value;
        const structural_thickness = document.getElementById('structural_thickness').value;
        const required_thickness = document.getElementById('required_thickness').value;

        return { cml_number, cml_description, actual_outside_diameter, design_thickness, structural_thickness, required_thickness };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newCMLData = result.value;
        try {
          const response = await fetch('../../api/addCML', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...newCMLData, lineNumber }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setCmlData((prevData) => {
              const updatedData = Array.isArray(prevData) ? prevData : [];
              return [...updatedData, data];
            });
            Swal.fire('Saved!', 'ข้อมูลถูกเพิ่มแล้ว.', 'success');
          } else {
            Swal.fire('Error', 'เพิ่มข้อมูลผิดพลาด', 'error');
          }
        } catch (error) {
          console.log(error);
          Swal.fire('Error', 'เกิดข้อผิดพลาด', 'error');
        }
    }
  });
};

  return (
    <button className="addButton" onClick={handleAdd}>
      Add CML
    </button>
  );
};

export default AddCML;
