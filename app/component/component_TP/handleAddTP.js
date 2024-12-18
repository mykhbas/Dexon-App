import Swal from 'sweetalert2';
import "../../styles/swal.css"

const AddTestPoint = ({ testPointData, setTestPoints,id_cml }) => {
  const handleAdd = () => {
    Swal.fire({
      title: 'Add Test Point',
      html: `
        <input id="tp_number" class="swal2-input" placeholder="TP Number" type="number">
        <input id="tp_description" class="swal2-input" placeholder="TP Description" type="text">
        <input id="note" class="swal2-input" placeholder="Note" type="text">
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        const tp_number = document.getElementById('tp_number').value;
        const tp_description = document.getElementById('tp_description').value;
        const note = document.getElementById('note').value;

        return { tp_number, tp_description, note };
      }
    }).then(async (result) => {
          if (result.isConfirmed) {
            const newPipingData = result.value;
    
            try {
              const response = await fetch('../../api/addTestPoint', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({...newPipingData,id_cml}),
              });
    
              if (response.ok) {
                const data = await response.json();
                setTestPoints((prevData) => [...prevData, data]); 
                Swal.fire('Saved!', 'ข้อมูลถูกเพิ่มแล้ว.', 'success');
              } else {
                Swal.fire('Error', 'เพิ่มข้อมูลผิดพลาด', 'error');
              }
            } catch (error) {
              console.log(error)
              Swal.fire('Error', 'เกิดข้อผิดพลาด', 'error');
            }
          }
        });
  };

  return (
    <button className="addButton" onClick={handleAdd}>
      Add Test Point
    </button>
  );
};

export default AddTestPoint;
