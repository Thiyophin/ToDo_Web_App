import React from "react";

function Footer() {
  return (
    <div className=" row">
      <footer className="footer bg-dark  text-center text-lg-start fixed-bottom">
        <div className="text-center p-3" style={{ color: "white" }}>
          Developed by : Thiyophin Johnson
          <div>
            <a
              href="https://github.com/Thiyophin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github "></i>
            </a>
            &nbsp;
            <a
              href="https://www.instagram.com/thiyophin_johnson/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
