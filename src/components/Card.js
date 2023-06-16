import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div>
      <div className="card mt-3" style={{"width":"18rem","maxHeight":"360px"}}>
        <img src="https://source.unsplash.com/700x900/?pizza" className="card-img-top rounded" alt="..." style={{ objectFit: "cover", height: "120px" }}/>
        <div className="card-body">
          <h5 className="card-title">Item 1</h5>
          <p className="card-text">Item made up of....</p>
          <div className="container m-2 w-100">
            <select className="m-3 h-100 rounded bg-secondary">
              {Array.from(Array(6), (e, itr) => {
                return (
                  <option key={itr + 1} value={itr + 1}>
                    {" "}
                    {itr + 1}{" "}
                  </option>
                );
              })}
            </select>

            <select className="m-3 h-100 rounded bg-secondary">
              <option value="full"> Full </option>
              <option value="half"> Half </option>
            </select>

           
          </div>
        </div>
        </div>

    </div>
  );
};

export default Card;
