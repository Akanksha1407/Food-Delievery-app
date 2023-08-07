import React from 'react'
import Delete from '@mui/icons-material/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';

function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      
        <div className='m-5 w-100 text-center text-white fw-bold fs-3'>The Cart is Empty!</div>
      
    )
  }

  const handleCheckOut = async ()=>{
    let userEmail=localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData" , {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date :new Date().toDateString()
      })
    });
    console.log("Order Response:",response.status)
    if(response.status===200){
      dispatch({type:"DROP"})
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div>
        <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >S.No.</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
          {data.map((food, index) => (
              <tr className='text-white fs-6' key={index}>
                <th scope='row' >{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button " className="btn text-white p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
          </table>
          <div><h1 className='fs-4 text-white'>Total Price: {totalPrice}/-</h1></div>
          <div>
            <button className='btn bg-danger text-white fs-6 fw-bold mt-5' onClick={handleCheckOut}>Check Out</button>
          </div>
          </div>
    </div>
  )
}

export default Cart