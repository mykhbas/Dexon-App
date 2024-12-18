"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import "../../styles/table.css";
import UpdatePipingForm from '../../component/component_Piping/handleEditPiping';
import AddPipingForm from '../../component/component_Piping/handleAddPiping'; 

const PipingTable = () => {
  const router = useRouter();
  const [pipingData, setPipingData] = useState([]);

  useEffect(() => {
    const fetchPipingData = async () => {
      try {
        const response = await fetch('../../api/getPiping');  
        if (!response.ok) {
          throw new Error('Failed to fetch piping data');
        }
        const data = await response.json();
        console.log(data)
        setPipingData(data);  
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to fetch piping data', 'error');
      }
    };

    fetchPipingData();  
  }, []);  
  return (
    <div className="mainContainer">
      <h2>Piping Data</h2>
      <AddPipingForm pipingData={pipingData} setPipingData={setPipingData} /> 
      <table>
        <thead>
          <tr>
            <th>Line Number</th>
            <th>Location</th>
            <th>From</th>
            <th>To</th>
            <th>Pipe Size</th>
            <th>Service</th>
            <th>Material</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(pipingData) && pipingData.length > 0 ? (
          pipingData.map((piping) => (
            <tr key={piping.line_number}>
              <td>{piping.line_number}</td>
              <td>{piping.location}</td>
              <td>{piping.from}</td>
              <td>{piping.to}</td>
              <td>{piping.pipe_size}</td>
              <td>{piping.service}</td>
              <td>{piping.material}</td>
              <td>
                <div class="bottonBox">
                  <UpdatePipingForm
                    pipingData={pipingData}
                    setPipingData={setPipingData}
                    oldLine_number={piping.line_number}
                  />
                  <button onClick={() => router.push(`/pages/DetailPage?line_number=${piping.line_number}`)}>
                    Detail
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              ไม่มีข้อมูล
            </td>
          </tr>
        )}

        </tbody>
      </table>
      
    </div>
  );
};

export default PipingTable;
