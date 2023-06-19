import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/LoginPage");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GO FOOD
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 "
                    aria-current="page"
                    to="/"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <div
                  className="btn bg-secondary text-black mx-1" //mx is for margin left while me is for margin right
                >
                  My Cart
                </div>
                <div
                  className="btn bg-secondary text-black mx-1" //mx is for margin left while me is for margin right
                  onClick={handleLogout}
                >
                  Log Out
                </div>
              </div>
            ) : (
              <div className="d-flex">
                <Link
                  className="btn bg-secondary text-black mx-1" //mx is for margin left while me is for margin right
                  to="/LoginPage"
                >
                  Log In
                </Link>
                <Link
                  className="btn bg-secondary text-black mx-1"
                  to="/SignUpPage"
                >
                  Sign-Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
