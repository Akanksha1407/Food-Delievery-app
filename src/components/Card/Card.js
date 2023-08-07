import { React, useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "../ContextReducer";
import "./Card.css";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options || {});
  let foodItem = props.item;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item?.id === foodItem?._id) {
        food = item;

        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem?._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem?._id,
          name: foodItem?.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.imgrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem?._id,
      name: foodItem?.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div
        className=" card mt-3 "
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <img
          src={props.imgsrc}
          className="card-img-top"
          alt="..."
          style={{ height: "180px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100"></div>
          <select
            className="m-2 h-100 bg-danger rounded fw-bold"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {" "}
                  {i + 1}{" "}
                </option>
              );
            })}
          </select>

          <select
            className="m-2 h-100 bg-danger rounded fw-bold"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>

          <div className="d-inline h-100 fs-6 fw-bold">₹{finalPrice}/-</div>
          <hr />
          <button
            className={`btn btn-danger justify-center ms-2 fw-bold`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
