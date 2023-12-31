import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyOrder from "./pages/MyOrder";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/LoginPage" element={<Login></Login>}></Route>
          <Route exact path="/SignUpPage" element={<SignUp></SignUp>}></Route> 
          <Route exact path='/myOrder' element={<MyOrder></MyOrder>}></Route>
          <Route exact path="/AdminPage" element={<Admin></Admin>}></Route>
          <Route exact path="/AdminDashboard" element={<AdminDashboard></AdminDashboard>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//Here the routes are working like whenever in the Navbar the signup button is clicked it is directly Link to /signuppage and in app.js it is routed that whenever the /signuppage is called you have to show the signup component(page)
