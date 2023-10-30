import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="first-col">
        <h1 className="company-name">QEstate Homes</h1>
        <div className="company-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit,
          labore, dolores id vero rem iusto aliquam impedit, porro unde non
          corporis? Odio porro quis earum sed asperiores eveniet odit fugiat
          dicta non rem dolore eum magni magnam possimus exercitationem facilis
          voluptatum, cumque, assumenda aspernatur numquam blanditiis!
        </div>
      </div>
      <div className="second-col">
        <h1 className="link-header">Contacts</h1>
        <ul className="link-items">
            <li>Bengaluru, India</li>
            <li>admin@qestate.com</li>
            <li>+91900000112</li>
            <li>+021 93489223</li>
        </ul>
      </div>
    </div>
  );
}
