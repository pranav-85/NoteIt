import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";
import Loading from "./loading";
function Register() {
  const [passVisibility, setPassVisibility] = useState(false);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoading, setLoadingStatus] = useState(false);

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await axios.get("/api/get_csrf_token/");
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    }
    fetchCsrfToken();
  }, []);

  function handlePassVisibility() {
    setPassVisibility(!passVisibility);
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoadingStatus(true);

    const formData = {
      Email: event.target.Email.value,
      Password: event.target.Password.value,
      FirstName: event.target.FirstName.value,
      LastName: event.target.LastName.value,
    };

    try {
      await axios.post("/register/api/register/", formData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      console.log("Registration successful");
      window.location.replace("http://127.0.0.1:8000/home/")
    } catch (error) {
      console.error("Registration failed", error);
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }finally {
    setLoadingStatus(false);
    }
  };

  if(isLoading){
    return(<Loading></Loading>);
  }
  else{
    return (
      <div className="register-container">
        <a href="#" className="register-label">
          Create an account
        </a>
        <form onSubmit={handleRegister}>
          <div className="name-details">
            <div className="first-name">
              <p className="first-name-label">First Name</p>
              <input
                type="text"
                className="first-name-field"
                required
                name="FirstName"
              />
            </div>
            <div className="last-name">
              <p className="last-name-label">Last Name</p>
              <input type="text" className="last-name-field" name="LastName" />
            </div>
          </div>
          <div className="email-register">
            <p className="email-register-label">Email</p>
            <input
              type="text"
              className="email-register-field"
              required
              name="Email"
            />
          </div>
          <div className="password-register">
            <p className="password-register-label">Password</p>
            <input
              type={passVisibility ? "text" : "password"}
              className="password-register-field"
              required
              name="Password"
            />
            <button
              className="pass-visibility-register"
              onClick={() => handlePassVisibility()}
              type="button"
            >
              {passVisibility ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                      stroke="#fdfcfc"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                      stroke="#fdfcfc"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="#fdfcfc"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></circle>{" "}
                  </g>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M2 2L22 22"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              )}
            </button>
          </div>
          {error && (
            <div className="error-message-register">
              <p>{error}</p>
            </div>
          )}
          <button type="submit" className="register-button">
            <span>Register</span>
          </button>
        </form>
        <p className="login">
          Already have an account? <Link to={"/"}>Login</Link>
        </p>
      </div>
    );
  }
}

export default Register;
