"use client";
import "../../styles/swal.css"

import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EditPipingPopup = ({ currentPiping, onSave }) => {
    const handleEdit = () => {
      Swal.fire({
        title: 'Edit Piping Data',
        html: `
        <div class="swal2-input-container">
          <input id="location" class="swal2-input" placeholder="Location" value="${currentPiping.location}">
          <input id="from" class="swal2-input" placeholder="From" value="${currentPiping.from}">
          <input id="to" class="swal2-input" placeholder="To" value="${currentPiping.to}">
          <input id="pipeSize" class="swal2-input" placeholder="Pipe Size" value="${currentPiping.pipeSize}">
          <input id="service" class="swal2-input" placeholder="Service" value="${currentPiping.service}">
          <input id="material" class="swal2-input" placeholder="Material" value="${currentPiping.material}">
        </div>
          `,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const location = document.getElementById('location').value;
          const from = document.getElementById('from').value;
          const to = document.getElementById('to').value;
          const pipeSize = document.getElementById('pipeSize').value;
          const service = document.getElementById('service').value;
          const material = document.getElementById('material').value;
  
          return { location, from, to, pipeSize, service, material };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          onSave(result.value);
        }
      });
    };
  
    return (
      <button onClick={handleEdit}>Edit</button>
    );
  };
  
  export default EditPipingPopup;
  
