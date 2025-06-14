import React from "react";
import "../../../styles/sectionHome.css"; // Import the CSS file for styling
import principal from "../../../assets/Principal2.png"; // Import the logo image
function SectionHome() {
  return (
    <section className="section-home" style={{ backgroundImage: `url(${principal})` }}>
      <div className="content">
        <h1>
            Brújula
        </h1>
             <h2 className="">Viajes que inspiran, experiencias que perduran</h2>
      </div>
    </section>
  );
}

export default SectionHome;