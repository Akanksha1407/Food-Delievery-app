import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {CartProvider} from './components/ContextReducer';
import MyOrder from './Screens/MyOrder';


function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/createuser" element={<Signup/>} />
          <Route exact path="/myOrderData" element={<MyOrder/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
