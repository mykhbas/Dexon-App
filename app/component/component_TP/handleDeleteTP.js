import Swal from 'sweetalert2';

const DeleteButtonTP = ({ id_tp, testPoints, setTestPoints }) =>{
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
          const response = await fetch("../../api/deleteTp", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_tp }),
          });
      
          if (!response.ok) {
            throw new Error("Failed to delete CML");
          }
          setTestPoints((prevData) =>
            prevData.filter((tp) => tp.id_tp !== id_tp)
          );
          Swal.fire('Saved!', 'ลบเรียบร้อย.', 'success');
        } catch (err) {
          console.error("Error deleting CML:", err);
          Swal.fire('Error', "การลบผิดพลาด" + err.message, 'error');
        }
      };
    }
      
  
    return (
      <button onClick={handleDelete}>
        Delete
      </button>
    );
  }
  
  export default DeleteButtonTP;
  