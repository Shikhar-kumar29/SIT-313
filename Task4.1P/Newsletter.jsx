import React from "react";

function Newsletter() {
  return (
    <section style={{ textAlign: "center", margin: "40px 0" }}>
      <h3>SIGN UP FOR OUR DAILY INSIDER</h3>
      <input type="email" placeholder="Enter your email" style={{ marginRight: "10px" }} />
      <button>Subscribe</button>
    </section>
  );
}

export default Newsletter;
