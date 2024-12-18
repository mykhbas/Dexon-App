"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../styles/swal.css"

const UpdatedThickness = ({ id_thickness, thicknessData, setThicknessData }) => {
  const [inspectionDate, setInspectionDate] = useState(null);
  const [actualThickness, setActualThickness] = useState(null);
  const [currentThickness, setCurrentThickness] = useState(null);

  useEffect(() => {
    const foundThickness = thicknessData.find((thickness) => thickness.id_thickness === id_thickness);

    if (foundThickness) {
      setInspectionDate(foundThickness.inspection_date);
      setActualThickness(foundThickness.actual_thickness);
      setCurrentThickness(foundThickness);
    }
  }, [thicknessData, id_thickness]);

  const openModal = () => {
    const formattedDate = new Date(inspectionDate).toISOString().split('T')[0];
    Swal.fire({
      title: "Edit Thickness",
      html: `
      <div class="swal2-input-container">
        <input id="inspection_date" class="swal2-input" value="${formattedDate || ""}" placeholder="Inspection Date" type="date">
        <input id="actual_thickness" class="swal2-input" value="${actualThickness || ""}" placeholder="Actual Thickness" type="number">
      </div>
        `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const inspection_date = document.getElementById("inspection_date").value;
        const actual_thickness = document.getElementById("actual_thickness").value;

        if (!inspection_date || !actual_thickness) {
          Swal.showValidationMessage("ข้อมูลไม่ครบ");
          return null;
        }

        return { inspection_date, actual_thickness };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedData = result.value;
        try {
          const response = await fetch("../../api/editThickness", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_thickness: currentThickness.id_thickness,
              inspection_date: updatedData.inspection_date,
              actual_thickness: updatedData.actual_thickness,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to update Thickness");
          }

          const updatedThickness = await response.json();

          setThicknessData((prevData) =>
            prevData.map((thickness) =>
              thickness.id_thickness === updatedThickness.id_thickness ? updatedThickness : thickness
            )
          );

          Swal.fire("Success", "อัปเดตแล้ว", "success");
        } catch (error) {
          Swal.fire("Error", "อัปเดตล้มเหลว", "error");
        }
      }
    });
  };

  return (
    <button onClick={openModal}>
      Edit
    </button>
  );
};

export default UpdatedThickness;
