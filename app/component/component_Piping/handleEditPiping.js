import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';
import "../../styles/swal.css"

const UpdatePipingForm = ({ pipingData, setPipingData,oldLine_number }) => {
  const [selectedPiping, setSelectedPiping] = useState([]);
  const [oldPipeSize, setOldPipeSize] = useState(null);

  useEffect(()=>{
    
    const piping = pipingData.find((p) => p.line_number === oldLine_number);
    setSelectedPiping(piping); 
    setOldPipeSize(piping.pipe_size)
  },[])
  const openModal = () => {
    const pipeSize = [ 0.125,0.25,0.357,0.5,0.75,1.0,1.25,1.5,2.0,2.5,3.0,3.5,4.0,5.0,6.0,8.0,10.0,12.0,14.0,16.0,18.0];

    Swal.fire({
      title: "Edit Piping Data",
      html: `
      <div class="swal2-input-container">
        <input id="line_number" class="swal2-input" placeholder="Line Number" type="text" value="${selectedPiping?.line_number || ""}">
        <input id="location" class="swal2-input" placeholder="Location" type="text" value="${selectedPiping?.location || ""}">
        <input id="from" class="swal2-input" placeholder="From" type="text" value="${selectedPiping?.from || ""}">
        <input id="to" class="swal2-input" placeholder="To" type="text" value="${selectedPiping?.to || ""}">
        <select id="pipe_size" class="swal2-input">
          <option value="" disabled ${!selectedPiping?.pipe_size ? 'selected' : ''}>Select Pipe Size</option>
          ${pipeSize.map(size => `
            <option value="${size}" ${selectedPiping?.pipe_size === size ? 'selected' : ''}>${size} inches</option>
          `).join('')}
        </select>
        <input id="service" class="swal2-input" placeholder="Service" type="text" value="${selectedPiping?.service || ""}">
        <input id="material" class="swal2-input" placeholder="Material" type="text" value="${selectedPiping?.material || ""}">
        <input id="inservice_date" class="swal2-input" placeholder="In-service Date" type="date" value="${selectedPiping?.inservice_date?.split('T')[0] || ""}">
        <input id="original_thickness" class="swal2-input" placeholder="Original Thickness" type="number" value="${selectedPiping?.original_thickness || ""}">
        <input id="stress" class="swal2-input" placeholder="Stress" type="number" value="${selectedPiping?.stress || ""}">
        <input id="joint_efficiency" class="swal2-input" placeholder="Joint Efficiency" type="number" value="${selectedPiping?.joint_efficiency || ""}">
        <input id="ca" class="swal2-input" placeholder="CA" type="number" value="${selectedPiping?.ca || ""}">
        <input id="design_life" class="swal2-input" placeholder="Design Life" type="number" value="${selectedPiping?.design_life || ""}">
        <input id="design_pressure" class="swal2-input" placeholder="Design Pressure" type="number" value="${selectedPiping?.design_pressure || ""}">
        <input id="operating_pressure" class="swal2-input" placeholder="Operating Pressure" type="number" value="${selectedPiping?.operating_pressure || ""}">
        <input id="design_temperature" class="swal2-input" placeholder="Design Temperature" type="number" value="${selectedPiping?.design_temperature || ""}">
        <input id="operating_temperature" class="swal2-input" placeholder="Operating Temperature" type="number" value="${selectedPiping?.operating_temperature || ""}">
        <input id="drawing" class="swal2-input" placeholder="Drawing Number" type="text" value="${selectedPiping?.drawing || ""}">
      </div>
        `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const line_number = document.getElementById('line_number').value;
        const location = document.getElementById('location').value;
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const pipe_size = document.getElementById('pipe_size').value;
        const service = document.getElementById('service').value;
        const material = document.getElementById('material').value;
        const inservice_date = document.getElementById('inservice_date').value;
        const original_thickness = document.getElementById('original_thickness').value;
        const stress = document.getElementById('stress').value;
        const joint_efficiency = document.getElementById('joint_efficiency').value;
        const ca = document.getElementById('ca').value;
        const design_life = document.getElementById('design_life').value;
        const design_pressure = document.getElementById('design_pressure').value;
        const operating_pressure = document.getElementById('operating_pressure').value;
        const design_temperature = document.getElementById('design_temperature').value;
        const operating_temperature = document.getElementById('operating_temperature').value;
        const drawing = document.getElementById('drawing').value;
  
        return {
          line_number, location, from, to, pipe_size, service, material, inservice_date, original_thickness, stress, joint_efficiency, ca, design_life, design_pressure, operating_pressure, design_temperature, operating_temperature, drawing
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedPipingData = result.value;
        try {
          const response = await fetch('../../api/editPiping', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...updatedPipingData,
              oldLine_number,
            }),
          });
          if(oldPipeSize!=updatedPipingData.pipe_size){
            const responseEdit = await fetch('../../api/changePipeSize', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                line_number : updatedPipingData.line_number,
                pipe_size: updatedPipingData.pipe_size,
                design_pressure : updatedPipingData.design_pressure,
                stress : updatedPipingData.stress,
                joint_efficiency : updatedPipingData.joint_efficiency,
              }),
            });
          }
          if (response.ok) {
            const data = await response.json();
            setPipingData((prevData) => {
              const index = prevData.findIndex((p) => p.line_number === oldLine_number);
              const updatedData = [...prevData];
              updatedData[index] = data;
              return updatedData;
            });
            Swal.fire('Saved!', 'อัปเดตแล้ว.', 'success');
          } else {
            Swal.fire('Error', 'อัปเดตล้มเหลว.', 'error');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'เกิดข้อผิดพลาด', 'error');
        }
      }
    });
  };
  

  return (
    <div>
      <button onClick={openModal}>Info</button>
    </div>
  );
};

export default UpdatePipingForm;
