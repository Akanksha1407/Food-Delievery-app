import {React, useState }from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';

function Login() {
  
  const[credentials , setCredentials]= useState({email:"",password:""});
  let navigate =useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();
      const response =await fetch("http://localhost:5000/api/loginuser",{
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({email:credentials.email , password:credentials.password})
      });
      const json = await response.json()
      console.log(json);

      if(!json.success){
        alert("Enter valid credentials")
      }

      if(json.success){
        localStorage.setItem("userEmail", credentials.email); 
        localStorage.setItem("authToken", json.authToken); 
        console.log(localStorage.getItem("authToken"))
        navigate("/");
      }
  }

  const onChange=(event)=>{
    setCredentials({...credentials , [event.target.name]:event.target.value})
  }


  return (

    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
        
      <div>
      <Navbar />
      </div>  
    <div className='container' >
          <form className='w-50 m-auto mt-5 bg-dark text-white border-success rounded fw-bold' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="email" className="form-label m-2 mt-4">Email address</label>
              <input type="email" className="form-control fw-bold" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label m-2">Password</label>
              <input type="password" className="form-control fw-bold" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-danger fw-bold">Submit</button>
            <Link to="/createuser" className="m-3 mx-1 btn btn-success fw-bold">I'm a new user</Link>
          </form>
        </div>
    </ div>
  )
}

export default Login