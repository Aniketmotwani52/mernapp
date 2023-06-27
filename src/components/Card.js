import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart, useDispatchCart } from "./ContextReducer";


const Card = (props) => {

  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  const foodItem = props.item_data;

  const options = props.option;
  let priceOptions = Object.keys(options);

  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");

  const handleQtyChange = (e) => {
      setQty(e.target.value);
  }
  
  const handleSizeChange = (e) => {
    setSize(e.target.value);
}

  const handleAddtoCart = async () => {

    let food=[];

    for(const item of data)
    {
      if(item.id===foodItem._id)
      {
        food=item;
        break;
      }
    }

    if(food !== [])
    {
        if(food.size===size)
        {
            await dispatch({type:"UPDATE",id:foodItem._id, price:finalPrice, qty:qty})
            return;
        }
        else if(food.size !== size)
        {
          await dispatch({type:"ADD", id:foodItem._id, name: foodItem.name, price:finalPrice, qty:qty, size:size, img: foodItem.img });
          return;
        }
        return;
    }

    else{
      await dispatch({type:"ADD", id:foodItem._id, name: foodItem.name, price:finalPrice, qty:qty, size:size, img: foodItem.img });
      return;
    }  
  }
  
  const finalPrice=qty*parseInt(options[size]);

  useEffect( () => {
    setSize(priceRef.current.value)
  },[]);


  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "480px" }}>
        <img
          src={foodItem.img}
          className="card-img-top rounded"
          alt={foodItem.name}
          style={{ objectFit: "cover", height: "120px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text fs-6">{foodItem.description}</p>
          <div className="container m-2 w-100">
            <select className="fs-4 h-100 rounded bg-secondary" onChange={handleQtyChange}>
              {Array.from(Array(6), (e, itr) => {
                return (
                  <option key={itr + 1} value={itr + 1}>
                    {" "}
                    {itr + 1}{" "}
                  </option>
                );
              })}
              {/* {options &&
                // eslint-disable-next-line array-callback-return
                Object.entries(options).map(([item_options, value], itr) => {
                  const currentValue = itr + 1;
                  return (
                    <option key={value} value={value}>
                      {currentValue}
                    </option>
                  );
                })} */}
            </select>
            <select className="m-3 h-100 fs-4 rounded bg-secondary" ref={priceRef} onChange={handleSizeChange}>
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
            <div className="d-inline h-100 fs-5 text-black">
              Rs. {finalPrice} /-
            </div>
          </div>
          <hr />
          <button className="btn btn-dark justify-center ms-2" onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
