import Swal from 'sweetalert2';

const DeleteButtonCML = ({ id_cml, cmlData, setCmlData }) =>{
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
          const response = await fetch("../../api/deleteCML", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_cml }),
          });
      
          if (!response.ok) {
            throw new Error("ลบแล้ว");
          }
          setCmlData((prevData) =>
            prevData.filter((cml) => cml.cml_number !== id_cml)
          );

          Swal.fire('Saved!', 'ลบเรียบร้อย.', 'success');
          location.reload();
        } catch (err) {
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
  
  export default DeleteButtonCML;
  