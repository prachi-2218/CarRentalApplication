import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux_store/store";
import { logoutUser } from "../../Redux_store/slices/userSlice";
import { set_state_to_old_bookings } from "../../Redux_store/slices/bookingSlice";
// import { set_state_to_old_carcardgrid } from "../../Redux_store/slices/carCardGridSlice";
// import { set_state_to_old_locationslice } from "../../Redux_store/slices/locationSlice";
import { set_state_to_old_carslice } from "../../Redux_store/slices/carSlice";
import { resetMeta_locations_key_value } from "../../Redux_store/slices/location_key_value_pair";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downArrowOpen, setArrowOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { login, firstname, role, userImgURL } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setTimeout(() => {
        if (
          userDropdownRef.current &&
          !userDropdownRef.current.contains(event.target as Node)
        ) {
          setDropdownOpen(false);
        }

        if (
          langDropdownRef.current &&
          !langDropdownRef.current.contains(event.target as Node)
        ) {
          setArrowOpen(false);
        }
      }, 0);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (login && role === "Admin") {
      navigate("/dashboard");
    }
  }, [login, role, navigate]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      if (!prev) {
        setMenuOpen(false);
        setArrowOpen(false);
      }
      return !prev;
    });
  };

  const toggleHamburger = () => {
    setMenuOpen((prev) => {
      if (!prev) {
        setDropdownOpen(false);
        setArrowOpen(false);
      }
      return !prev;
    });
  };

  const toggleArrow = () => {
    setArrowOpen((prev) => {
      if (!prev) {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
      return !prev;
    });
  };

  return (
    <>
      <div className="header border-b-[1px] border-gray-300">
        <div className="left-section">
          <div className="logo-header">
            Flexi<span>Ride</span>
          </div>

          <button className="hamburger" onClick={toggleHamburger}>
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        <div className={`navbar-header ${menuOpen ? "show" : ""}`}>
          {login ? (
            role === "Admin" ? (
              <NavLink to="/dashboard" className="link">
                Dashboard
              </NavLink>
            ) : (
              <>
                <NavLink to="/" className="link">
                  Home
                </NavLink>
                <NavLink to="/cars" className="link">
                  Cars
                </NavLink>
                <NavLink to="/mybookings" className="link">
                  My Bookings
                </NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/" className="link">
                Home
              </NavLink>
              <NavLink to="/cars" className="link">
                Cars
              </NavLink>
            </>
          )}
        </div>
        <div className="auth-lang">
          {!login ? (
            <div className="login">
              <Link to="/login" className="login-link">
                Log in
              </Link>
            </div>
          ) : (
            <>
              <div className="user-info-container">
                <div
                  className="user-info"
                  onClick={toggleDropdown}
                  ref={userDropdownRef}
                >
                  {userImgURL ? (
                    <img className="user-img" src={userImgURL} alt="user" />
                  ) : (
                    <div className="user-img fallback">
                      {firstname?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  Hello,&nbsp;
                  {firstname && firstname.length > 9
                    ? firstname.slice(0, 9) + ".."
                    : firstname}{" "}
                  ({role})
                </div>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item primary">
                      <button>My profile</button>
                    </div>
                    <div className="dropdown-item">
                      <button
                        className="logout-button"
                        onClick={() => {
                          dispatch(logoutUser());
                          dispatch(set_state_to_old_bookings())
                          // dispatch(set_state_to_old_carcardgrid())
                          dispatch(set_state_to_old_carslice())
                          // dispatch(set_state_to_old_locationslice())
                          dispatch(resetMeta_locations_key_value())
                          navigate("/login");
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <img
                  className="bell-icon-img"
                  src="/header_assets/bell-icon.svg"
                  alt="bell"
                />
              </div>
            </>
          )}
          <div
            className="lang-selector"
            onClick={toggleArrow}
            ref={langDropdownRef}
          >
            En{" "}
            <img
              className="arrow-img"
              src="/header_assets/down-arrow.svg"
              alt="arrow"
            />
            {downArrowOpen && (
              <div className="lang-dropdown">
                <div className="lang-option primary">English</div>
                <div className="lang-option">Hindi</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
