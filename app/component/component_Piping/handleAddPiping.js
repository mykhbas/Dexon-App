import Swal from 'sweetalert2';
import "../../styles/swal.css"

const AddPipingForm = ({ pipingData, setPipingData }) => {
  const handleAdd = () => {
    const pipeSize = [ 0.125,0.25,0.357,0.5,0.75,1.0,1.25,1.5,2.0,2.5,3.0,3.5,4.0,5.0,6.0,8.0,10.0,12.0,14.0,16.0,18.0];
    
    Swal.fire({
      title: 'Add New Piping Data',
      html: `
        <div class="swal2-input-container">
          <input id="line_number" class="swal2-input" placeholder="Line Number" type="text">
          <input id="location" class="swal2-input" placeholder="Location" type="text">
          <input id="from" class="swal2-input" placeholder="From" type="text">
          <input id="to" class="swal2-input" placeholder="To" type="text">
          <select id="pipe_size" class="swal2-input">
            <option value="" disabled selected>Select Pipe Size</option>
            ${pipeSize.map(size => `
              <option value="${size}">${size} inches</option>
            `).join('')}
          </select>
          <input id="service" class="swal2-input" placeholder="Service" type="text">
          <input id="material" class="swal2-input" placeholder="Material" type="text">
          <input id="inservice_date" class="swal2-input" placeholder="In-service Date" type="date">
          <input id="original_thickness" class="swal2-input" placeholder="Original Thickness" type="number">
          <input id="stress" class="swal2-input" placeholder="Stress" type="number">
          <input id="joint_efficiency" class="swal2-input" placeholder="Joint Efficiency" type="number">
          <input id="ca" class="swal2-input" placeholder="CA" type="number">
          <input id="design_life" class="swal2-input" placeholder="Design Life" type="number">
          <input id="design_pressure" class="swal2-input" placeholder="Design Pressure" type="number">
          <input id="operating_pressure" class="swal2-input" placeholder="Operating Pressure" type="number">
          <input id="design_temperature" class="swal2-input" placeholder="Design Temperature" type="number">
          <!-- Added operating_temperature input field -->
          <input id="operating_temperature" class="swal2-input" placeholder="Operating Temperature" type="number">
          <input id="drawing" class="swal2-input" placeholder="Drawing Number" type="text">
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
        const newPipingData = result.value;

        try {
          const response = await fetch('../../api/addPiping', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPipingData),
          });

          if (response.ok) {
            const data = await response.json();
            setPipingData((prevData) => [...prevData, data]);
            Swal.fire('Saved!', 'ข้อมูลถูกเพิ่มแล้ว.', 'success');
          } else {
            Swal.fire('Error', 'เพิ่มข้อมูลผิดพลาด.', 'error');
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
      Add
    </button>
  );
};

export default AddPipingForm;
