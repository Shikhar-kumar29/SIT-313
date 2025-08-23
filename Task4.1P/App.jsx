import React from "react";
import Navbar from "./4.1P/Navbar.jsx";
import Hero from "./4.1P/Hero.jsx";
import Articles from "./4.1P/Articles.jsx";
import Tutorials from "./4.1P/Tutorials.jsx";
import Newsletter from "./4.1P/Newsletter.jsx";
import Footer from "./4.1P/Footer.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Articles />
      <Tutorials />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
