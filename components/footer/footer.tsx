import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux_store/store";
// import { loginUser } from "../../Redux_store/slices/userSlice";

import "./Footer.css";

const Footer: React.FC = () => {
  const { login, role } = useSelector((state: RootState) => state.user);

  return (
    <footer className="footer mt-4 border-t-[1px] border-gray-300">
      <div className="footer-top">
        <div className="logo-footer">
          Flexi<span>Ride</span>
        </div>

        <div className="navbar-footer">
          {login && role === "Admin" ? (
            <Link to="/dashboard" className="link">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/cars" className="link">
                Cars
              </Link>
              {login && (
                <Link to="/mybookings" className="link">
                  My Bookings
                </Link>
              )}
            </>
          )}
        </div>

        <div className="icons">
          <img
            className="footer-img1"
            src="/footer_assets/facebook.svg"
            alt="facebook"
          />
          <img
            className="footer-img2"
            src="/footer_assets/instagram.svg"
            alt="instagram"
          />
          <img
            className="footer-img3"
            src="/footer_assets/x-logo.svg"
            alt="x"
          />
        </div>
      </div>

      <div className="footer-bottom">&copy;2025 FlexiRide</div>
    </footer>
  );
};

export default Footer;
