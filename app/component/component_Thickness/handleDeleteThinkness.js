import Swal from 'sweetalert2';
import "../../styles/swal.css"

const DeleteButtonThinkness = ({ id_thickness , thicknessData, setThicknessData }) =>{
    const handleDelete = async () => {
      const result = await Swal.fire({
        title: 'แน่ใจที่จะลบไหม?',
        text: 'จะไม่กลับคืนมาแล้วนา!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่',
      });
      if (result.isConfirmed) {
        try {
          const response = await fetch("../api/deleteThickness", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_thickness }),
          });
      
          if (!response.ok) {
            throw new Error("ลบล้มเหลว");
          }
          setThicknessData((prevData) =>
            prevData.filter((thicknessData) => thicknessData.id_thickness  !== id_thickness )
          );
          Swal.fire('Saved!', 'ลบเรียบร้อย.', 'success');
        } catch (err) {
          console.error("Error deleting CML:", err);
          Swal.fire('Error', "การลบผิดพลาด" + err.message, 'error');
        }
      }
    };
      
  
    return (
      <button onClick={handleDelete}>
        Delete
      </button>
    );
  }
  
  export default DeleteButtonThinkness;
  