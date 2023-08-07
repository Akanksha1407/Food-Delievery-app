import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  style={{ filter: "brightness(80%)" }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn text-white bg-danger"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/30×30/?burger"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/30×30/?pastry"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/30×30/?barbeque"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
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

      <div className="container">
        {foodCat !== []
          ? foodCat?.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-2 m-3 fw-bold">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItems !== [] ? (
                    foodItems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toString()
                            .toLowerCase()
                            .includes(search.toString().toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodName={filterItems.name}
                              item={filterItems}
                              options={filterItems.options[0]}
                              imgsrc={filterItems.img}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>

      <Footer />
    </div>
  );
}
