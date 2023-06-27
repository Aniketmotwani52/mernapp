import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [credentials, setcredentials] = useState({email:"",password:""});

    let navigate = useNavigate();
    
    //as soon as the submit button is pressed we want to fetch the data from that api
    const handleSubmit = async (e) => {
        e.preventDefault();
        //whenever the submit function is called then the link is called and post method is used to sent the data in the body format
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name:credentials.name, 
                password:credentials.password,
                email:credentials.email,
                location:credentials.geolocation
            })  
        })

        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter Valid Creentials");
        }

        if(json.success){
            localStorage.setItem("userEmail",credentials.email);
            localStorage.setItem("authToken",json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");

        }

        
    }

    const onChange = (event) => {
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <div>
    
    <div className="container">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-light">
            Login
          </button>

            <Link to="/SignUpPage" className="m-3 btn btn-danger">I am a new user </Link>

        </form>
      </div>
    
    </div>
  )
}

export default Login