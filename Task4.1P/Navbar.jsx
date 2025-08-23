import React from "react";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Left: Logo/Brand */}
      <h1 style={{ margin: 0, fontSize: "20px" }}>DEV@Deakin</h1>

      {/* Center: Search bar */}
      <input
        type="text"
        placeholder="Search..."
        style={{
          flex: "1",
          margin: "0 15px",
          maxWidth: "300px",
          padding: "6px 10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* Right: Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ padding: "6px 12px", cursor: "pointer" }}>Post</button>
        <button style={{ padding: "6px 12px", cursor: "pointer" }}>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
