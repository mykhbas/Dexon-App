"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import UpdatedCML from '../../component/component_CML/handleEditCML';
import DeleteButtonCML from "../../component/component_CML/handleDeleteCML";
import AddCML from '../../component/component_CML/handleAddCML'; 

import AddTestPoint from '../../component/component_TP/handleAddTP'; 
import UpdatedTestPoint from '../../component/component_TP/handleEditTP';
import DeleteButtonTP from "../../component/component_TP/handleDeleteTP";

import AddThickness from '../../component/component_Thickness/handleAddThickness';  
import DeleteButtonThinkness from '../../component/component_Thickness/handleDeleteThinkness';  
import UpdatedThickness from '../../component/component_Thickness/handleEditThickness';  

import "../../styles/table.css";
import Swal from 'sweetalert2';

const DetailPage = () => {
  const router = useRouter();
  const [infoData, setInfoData] = useState([]);
  const [cmlData, setCmlData] = useState([]);
  const [testPoints, setTestPoints] = useState([]);
  const [thicknessData, setThicknessData] = useState([]); 
  const [cmlId, setCmlId] = useState("");
  const [cmlNumber, setCmlNumber] = useState("");
  const [tpId, setTpId] = useState("");  
  const [tpNumber, setTpNumber] = useState("");  

  const searchParams = useSearchParams();
  const lineNumber = searchParams.get('line_number');

  useEffect(() => {
    const fetchCMLData = async () => {
      try {
        const response = await fetch('/api/getCML', {
          method: 'POST',
          body: JSON.stringify({ line_number: lineNumber }),
        });
        if (!response.ok) {
          throw new Error('ดึงข้อมูลผิดพลาด');
        }
        const data = await response.json();
        setCmlData(data);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'ดึงข้อมูลผิดพลาด', 'error');
      }
    }
    const fetchPipingData = async () => {
      try {
        const response = await fetch('../../api/getPiping');  
        if (!response.ok) {
          throw new Error('ดึงข้อมูลผิดพลาด');
        }
        const data = await response.json();
        setInfoData(data);  
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'ดึงข้อมูลผิดพลาด', 'error');
      }
    };

    fetchPipingData();  
    fetchCMLData();
  }, [lineNumber]);

  const fetchTestPoints = async (id_cml, cml_number) => {
    try {
      const response = await fetch('/api/getTestPoint', {
        method: 'POST',
        body: JSON.stringify({ id_cml: id_cml }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch test points');
      }
      const data = await response.json();
      setCmlId(id_cml);
      setCmlNumber(cml_number);
      setTestPoints(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'ดึงข้อมูลผิดพลาด', 'error');
    }
  };

  const fetchThicknessData = async (id_tp) => {
    try {
      const response = await fetch('/api/getThickness', {
        method: 'POST',
        body: JSON.stringify({ id_tp: id_tp }), 
      });
      if (!response.ok) {
        throw new Error('ดึงข้อมูลผิดพลาด');
      }
      const data = await response.json();
      setThicknessData(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'ดึงข้อมูลผิดพลาด', 'error');
    }
  };

  return (
    <div>
      <div className="mainContainer">
      <button
          className="backButton"
          onClick={() => router.push('../../pages/IndexPage')} 
        >
          ⬅ Back
        </button>
        <h2>Detail Page</h2>
        <div className="section">
          <h3>Line Number: {lineNumber} </h3>
          <AddCML infoData={infoData} cmlData={cmlData} setCmlData={setCmlData} lineNumber={lineNumber} />
          <table>
            <thead>
              <tr>
                <th>CML Number</th>
                <th>Description</th>
                <th>Actual Outside Diameter (mm)</th>
                <th>Design Thickness (mm)</th>
                <th>Structural Thickness (mm)</th>
                <th>Required Thickness (mm)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cmlData) && cmlData.length > 0 ? (
                cmlData.map((cml, index) => (
                  <tr key={index}>
                    <td>{cml.cml_number}</td>
                    <td>{cml.cml_description}</td>
                    <td>{cml.actual_outside_diameter}</td>
                    <td>{cml.design_thickness}</td>
                    <td>{cml.structural_thickness}</td>
                    <td>{cml.required_thickness}</td>
                    <td>
                      <div class="bottonBox">
                        <button onClick={() => fetchTestPoints(cml.id_cml, cml.cml_number)}>View TP</button>
                        <DeleteButtonCML id_cml={cml.id_cml} cmlData={cmlData} setCmlData={setCmlData} />
                        <UpdatedCML id_cml={cml.id_cml} cmlData={cmlData} setCmlData={setCmlData} line_number={lineNumber} />
                      </div>
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>ไม่มีข้อมูล</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Point Section */}
      <div className="mainContainer">
        <h2>Test Point</h2>
        <div className="section">
          {cmlId != "" ? (
            <div>
              <h3>CML Number: {cmlNumber} </h3>
              <AddTestPoint testPoints={testPoints} setTestPoints={setTestPoints} id_cml={cmlId} />
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'red' }}>กรุณาเลือก testpoint</p>
          )}

          <table>
            <thead>
              <tr>
                <th>TP Number</th>
                <th>TP Description</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(testPoints) && testPoints.length > 0 ? (
                testPoints.map((testPoint, index) => (
                  <tr key={index}>
                    <td>{testPoint.tp_number}</td>
                    <td>{testPoint.tp_description}</td>
                    <td>{testPoint.note}</td>
                    <td>
                    <div class="bottonBox">
                      <button onClick={() => {
                          setTpId(testPoint.id_tp);
                          setTpNumber(testPoint.tp_number)
                          fetchThicknessData(testPoint.id_tp); 
                      }}>View TN</button>
                      <UpdatedTestPoint id_tp={testPoint.id_tp} testPoints={testPoints} setTestPoints={setTestPoints} />
                      <DeleteButtonTP id_tp={testPoint.id_tp} testPoints={testPoints} setTestPoints={setTestPoints} />
                    </div>
                          
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>ไม่มีข้อมูล</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thickness Section */}
      <div className="mainContainer">
        <h2>Thickness</h2>
        <div className="section">
          {tpId ? (
            <div>
              <h3>Test Point Number: {tpNumber} </h3>
              <AddThickness thicknessData={thicknessData} setThicknessData={setThicknessData} id_tp={tpId} />
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'red' }}>กรุณาเลือก testpoint ก่อน</p>
          )}

          <table>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Actual Thickness (mm)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(thicknessData) && thicknessData.length > 0 ? (
                thicknessData.map((thickness, index) => (
                  <tr key={index}>
                    <td>{new Date(thickness.inspection_date).toLocaleDateString('en-GB')}</td>
                    <td>{thickness.actual_thickness}</td>
                    <td>
                      <div class="bottonBox">
                        <UpdatedThickness 
                            id_thickness={thickness.id_thickness} 
                            thicknessData={thicknessData} 
                            setThicknessData={setThicknessData} 
                          />
                          <DeleteButtonThinkness 
                            id_thickness={thickness.id_thickness} 
                            thicknessData={thicknessData} 
                            setThicknessData={setThicknessData} 
                          />
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>ไม่มีข้อมูล</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
