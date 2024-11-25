import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#FF8800", padding: "30px" }}>
      <div className="container">
        <div className="row">
          {/* Quick Links */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="text-white">QUICK LINKS</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="category?c=Women" className="footer-link">
                  WOMEN
                </Link>
              </li>
              <li>
                <Link to="category?c=Men" className="footer-link">
                  MEN
                </Link>
              </li>
              <li>
                <Link to="category?c=Baby" className="footer-link">
                  BABY
                </Link>
              </li>
              <li>
                <Link to="category?c=Kids" className="footer-link">
                  KIDS
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Information */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="text-white">INFORMATION</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="#" className="footer-link">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="text-white">COMPANY</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="#contact-us" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="text-white">GET IN TOUCH</h5>
            <form className="d-flex mt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="form-control me-2"
              />
              <button type="submit" className="btn btn-dark">
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3 text-white">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        .footer-link {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #000;
          cursor: pointer;
          transform: translateY(-5px, 0); 
          transition: all 0.3s ease; 
        }
      `}</style>
    </footer>
  );
}

export default Footer;
