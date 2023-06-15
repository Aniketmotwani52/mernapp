import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/1600x900/?beach"
                className="d-block w-100"
                alt="1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/1600x900/?beach"
                className="d-block w-100"
                alt="2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/1600x900/?beach"
                className="d-block w-100"
                alt="3"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div>
        <Card />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
