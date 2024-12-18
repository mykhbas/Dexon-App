"use client";

import "../styles/component.css"
export default function Navbar() {
  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none", padding: 0, alignItems: "center" }}>
        <li style={{ margin: "0 10px" }}>
            <h1>Dexon App</h1>
        </li>
      </ul>
    </nav>
  );
}
