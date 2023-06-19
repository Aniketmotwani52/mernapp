import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const Carousel = ({onSearch}) => {

  const handleChange = (event)=>{
    const value = event.target.value;
    onSearch(value);
  }

  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade m-3 rounded"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel" style={{"objectFit":"contain !important"}}>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
              />
          </div>
          <div className="carousel-item active" >
            <img
              src="https://source.unsplash.com/900x700/?burger"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/900x700/?choclate"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/900x700/?barbeque"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
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
          data-bs-target="#carouselExampleFade"
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
  );
};

export default Carousel;
