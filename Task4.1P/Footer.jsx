import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "#2a9d8f",
        color: "black",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        {/* Explore Section */}
        <div>
          <h3>Explore</h3>
          <p>Home</p>
          <p>Questions</p>
          <p>Articles</p>
          <p>Tutorials</p>
        </div>

        {/* Support Section */}
        <div>
          <h3>Support</h3>
          <p>FAQs</p>
          <p>Help</p>
          <p>Contact Us</p>
        </div>

        {/* Stay connected Section */}
        <div>
          <h3>Stay connected</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                style={{ width: "30px", height: "30px" }}
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
                style={{ width: "30px", height: "30px" }}
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
                style={{ width: "30px", height: "30px" }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "bold" }}>DEV@Deakin 2022</p>
        <p>Privacy Policy &nbsp;&nbsp;&nbsp; Terms &nbsp;&nbsp;&nbsp; Code of Conduct</p>
      </div>
    </footer>
  );
}

export default Footer;
