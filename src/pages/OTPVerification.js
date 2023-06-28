import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPVerification = ({ name, password, location, email }) => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify OTP
    const response = await fetch("http://localhost:5000/api/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email : email,
        otp : otp,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // OTP verified, proceed with user creation
      const response = await fetch("http://localhost:5000/api/creatingUser",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email : email,
            password : password,
            location : location
        }),
      });
      navigate("/LoginPage")
    } else {
        console.log(otp);
        console.log("Here is the error");
      alert(json.error);
    }
  };

  const onChange = (event) => {
    setOTP(event.target.value);
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
            OTP
          </label>
          <input
            type="text"
            className="form-control"
            id="otp"
            name="otp"
            value={otp}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-light">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
