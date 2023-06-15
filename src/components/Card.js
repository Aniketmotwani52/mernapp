import React from 'react'
import { Link } from 'react-router-dom';

const Card = () => {
  return (
    <div>
        <div
          className="card m-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <div className="card-body">
            <h5 className="card-title">Item 1</h5>
            <p className="card-text">Item made up of....</p>
            <div className="container w-100 rounded">
              <select className="m-2 h-100 rounded bg-secondary">
                {Array.from(Array(6), (e, itr) => {
                  return (
                    <option key={itr + 1} value={itr + 1}>
                      {" "}
                      {itr + 1}{" "}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100 rounded bg-secondary">
                <option value="full"> Full </option>
                <option value="half"> Half </option>
              </select>

              <div className="d-inline h-100 fs-5">Total Price</div>
            </div>
            <Link to="/" className="btn btn-primary">
              Calculate
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Card