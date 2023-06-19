import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const options = props.option;
  let priceOptions = Object.keys(options);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.imageURL}
          className="card-img-top rounded"
          alt={props.item_name}
          style={{ objectFit: "cover", height: "120px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.item_name}</h5>
          <p className="card-text fs-6">{props.about}</p>
          <div className="container m-2 w-100">
            <select className="m-3 fs-4 h-100 rounded bg-secondary">
              {/* {Array.from(Array(6), (e, itr) => {
                return (
                  <option key={itr + 1} value={itr + 1}>
                    {" "}
                    {itr + 1}{" "}
                  </option>
                );
              })} */}
              {options &&
                // eslint-disable-next-line array-callback-return
                Object.entries(options).map(([item_options, value], itr) => {
                  const currentValue = itr + 1;
                  return (
                    <option key={value} value={value}>
                      {currentValue}
                    </option>
                  );
                })}
            </select>
            <select className="m-3 h-100 fs-4 rounded bg-secondary">
              {/* {options &&
                Object.entries(options).map(([item_options, value]) => (
                  <option key={value} value={item_options}>
                    {item_options}
                  </option>
                ))} */}
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
