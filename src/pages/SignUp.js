import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})

    //as soon as the submit button is pressed we want to fetch the data from that api
    const handleSubmit = async (e) => {
        e.preventDefault();
        //whenever the submit function is called then the link is called and post method is used to sent the data in the body format
        const response = await fetch("http://localhost:5000/api/createuser",{
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

    }
    //whenever the onChange function takes place the value in that event is carried and all the credentials are as it is except that whose value is changed

    const onChange = (event) => {
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }


  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange}/>
          </div>

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

          <div className="mb-3">
            <label className="form-label">
              Address
            </label>
            <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange}/>
          </div>

          <button type="submit" className="btn btn-light">
            Submit
          </button>

            <Link to="/LoginPage" className="m-3 btn btn-danger">Already a user </Link>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
