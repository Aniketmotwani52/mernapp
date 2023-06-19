import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const Home = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);


  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  //Here the empty array denotes that it isn't dependent on any other function rather when the page reloads for the 1st time loadData is called

  const [searchValue,setSearchValue] = useState("");

  const handleSearchInputChange = (value)=>{
    setSearchValue(value);
  }

  return (
    <div>

      <div>
        <Navbar />
      </div>

      <div>
        <Carousel onSearch={handleSearchInputChange}></Carousel>
      </div>

      {/* Cards */}
      <div className="container m-3">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id} className="row m-3">
                <div className="fs-4 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(searchValue.toLowerCase())))
                    .map((item_data) => {
                      return (
                        <div key={item_data._id} className="col-12 col-md-6 col-lg-3">
                          <div className="fs-3 m-3 fst-italics">
                            <Card
                              item_name={item_data.name}
                              imageURL={item_data.img}
                              about={item_data.description}
                              option={item_data.options[0]}
                            />
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div>{console.log("Item's are loading")}</div>
                )}
              </div>
            );
          })
        ) : (
          <div>{console.log("Wait to start!")}</div>
        )}
      </div>

      <div>
        <Footer />
      </div>

    </div>
  );
};

export default Home;
