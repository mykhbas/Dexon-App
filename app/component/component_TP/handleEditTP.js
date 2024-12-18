"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../styles/swal.css"

const UpdatedTestPoint = ({ id_tp, testPoints, setTestPoints }) => {
  const [tpNumber, setTpNumber] = useState(null);
  const [tpDescription, setTpDescription] = useState(null);
  const [note, setNote] = useState(null);
  const [currentTestPoint, setCurrentTestPoint] = useState(null);

  useEffect(() => {
    const foundTestPoint = testPoints.find((tp) => tp.id_tp === id_tp);
    console.log(id_tp,testPoints)

    if (foundTestPoint) {
      setTpNumber(foundTestPoint.tp_number);
      setTpDescription(foundTestPoint.tp_description);
      setNote(foundTestPoint.note);
      setCurrentTestPoint(foundTestPoint);
    }
  }, [testPoints, id_tp]);

  const openModal = () => {
    console.log(tpNumber,tpDescription,note,currentTestPoint)
    Swal.fire({
      title: "Edit Test Point",
      html: `
        <input id="tp_number" class="swal2-input" value="${tpNumber || ""}" placeholder="TP Number" type="number">
        <input id="tp_description" class="swal2-input" value="${tpDescription || ""}" placeholder="TP Description" type="text">
        <input id="note" class="swal2-input" value="${note || ""}" placeholder="Note" type="text">
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const tpNumber = document.getElementById("tp_number").value;
        const tpDescription = document.getElementById("tp_description").value;
        const note = document.getElementById("note").value;

        if (!tpNumber || !tpDescription) {
          Swal.showValidationMessage("TP Number and Description are required");
          return null;
        }

        return { tpNumber, tpDescription, note };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedData = result.value;
        try {
          const response = await fetch("../api/editTP", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_tp: currentTestPoint.id_tp,
              tp_number: updatedData.tpNumber,
              tp_description: updatedData.tpDescription,
              note: updatedData.note,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to update Test Point");
          }

          const updatedTestPoint = await response.json();

          setTestPoints((prevData) =>
            prevData.map((tp) =>
              tp.id_tp === updatedTestPoint.id_tp ? updatedTestPoint : tp
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

export default UpdatedTestPoint;
