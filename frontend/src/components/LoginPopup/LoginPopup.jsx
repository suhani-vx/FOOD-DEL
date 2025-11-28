import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from "../../assets/assets";
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext); // ✅ include setToken here

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ✅ Handle login/signup
  const onLogin = async (event) => {
    event.preventDefault();

    try {
      let endpoint = "";
      let bodyData = {};

      if (currState === "Login") {
        endpoint = `${url}/api/user/login`;
        bodyData = {
          email: data.email,
          password: data.password,
        };
      } else {
        endpoint = `${url}/api/user/register`;
        bodyData = {
          name: data.name,
          email: data.email,
          password: data.password,
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("✅ Success:", result);
        alert(currState === "Login" ? "Login Successful!" : "Signup Successful!");

        // ✅ Save token to context and localStorage
        setToken(result.token);
        localStorage.setItem("token", result.token);
        console.log("Saved token:", localStorage.getItem("token"));

        setShowLogin(false);
      } else {
        alert(result.message || "Something went wrong!");
        console.error("❌ Error:", result);
      }
    } catch (err) {
      console.error("❌ Network Error:", err);
      alert("Server not responding. Please try again.");
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        {/* Title */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        {/* Inputs */}
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder='Your Name'
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Your Email'
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />
        </div>

        {/* Button */}
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Terms & Conditions */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/* Switch Login / Sign Up */}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
