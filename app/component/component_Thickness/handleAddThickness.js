import Swal from 'sweetalert2';
import "../../styles/swal.css"

const AddThickness = ({ id_tp,thicknessData,setThicknessData }) => {
  const handleAdd = () => {
    Swal.fire({
      title: 'Add Thickness Data',
      html: `
      <div class="swal2-input-container">
        <input id="inspection_date" class="swal2-input" placeholder="Inspection Date" type="date">
        <input id="actual_thickness" class="swal2-input" placeholder="Actual Thickness" type="number" step="0.01">
      </div>
        `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        const inspection_date = document.getElementById('inspection_date').value;
        const actual_thickness = document.getElementById('actual_thickness').value;

        return { inspection_date, actual_thickness };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newThicknessData = result.value;

        try {
          const response = await fetch('/api/addThickness', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...newThicknessData, id_tp }),
          });

          if (response.ok) {
            const data = await response.json();
            setThicknessData((prevData) => [...prevData, data]);
            Swal.fire('Saved!', 'ข้อมูลถูกเพิ่มแล้ว.', 'success');
          } else {
            Swal.fire('Error', 'เพิ่มข้อมูลผิดพลาด.', 'error');
          }
        } catch (error) {
          Swal.fire('Error', 'เกิดข้อผิดพลาด', 'error');
        }
      }
    });
  };

  return (
    <button className="addButton" onClick={handleAdd}>
      Add Thickness
    </button>
  );
};

export default AddThickness;
