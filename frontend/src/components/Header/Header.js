import React from "react";
import './Header.css'

export default function Header({ onPage }) {
  return (
    <div className="header">
      <div className="logo">QEstate</div>

      {onPage === "home" ? (
        <div className="nav-link">
          <span>Explore</span>
        </div>
      ) : null}
    </div>
  );
}
