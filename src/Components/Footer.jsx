import React from "react";

function Footer() {
  return (
    <div className=" row mt-4" >
      <footer className="footer fixed-bottom  bg-dark  text-center text-lg-start ">
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
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
