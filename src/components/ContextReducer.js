/* eslint-disable no-fallthrough */
/* eslint-disable array-callback-return */
import React, { createContext, useContext, useReducer, useState } from "react";

const CartDispatchContext = createContext( () => {
    throw new Error("Dispatch function not provided");
});
const CartStateContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state,{id : action.id,name:action.name, qty:action.qty, size:action.size, price: action.price, img: action.img }]    
        
        //we can't directly remove from the state hence first we have to add it in a newArray then remove from that array
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index,1);
            return newArr;

        case "UPDATE":
            let arr=[...state]
            arr.find((food,index)=>{
                if(food.id===action.id)
                {
                        console.log(food.qty,parseInt(action.qty),action.price+food.price);
                        arr[index]={...food, qty: parseInt(action.qty)+food.qty , price: action.price + food.price }
                        
                }
                return arr;
            })
            return arr;
          
        case "DROP":
            let empArray=[];
            return empArray


        default:
            return console.log("Server Error Occured ! (Reducer not working)")
    }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
          {children}
        </CartStateContext.Provider>
      </CartDispatchContext.Provider>
    </div>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
