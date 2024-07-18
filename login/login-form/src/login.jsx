import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from "./loading";
function Login() {
  const [passVisibilty, setPassVisibilty] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoadingStatus] = useState(false);


  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await axios.get("api/get_csrf_token/");
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    }
    fetchCsrfToken();
  }, []);

  function handlePassVisbility(e) {
    setPassVisibilty(!passVisibilty);
  }

  const handleLoginButton = async (event) => {
    event.preventDefault();
    setLoadingStatus(true);
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    console.log(formData);
    try {
      await axios.post(`/api/login/`, formData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });

      window.location.replace("http://127.0.0.1:8000/home/")
    } catch (error) {
      console.error("Login failed", error);
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
    finally{
      setLoadingStatus(false);
    }
  };

  if(isLoading){
    return (<Loading></Loading>);
  }
  else{
    return (
      <>
        <div className="login-container">
          <a href="#" className="login-label">
            Log In
          </a>
          <form onSubmit={handleLoginButton}>
          <div className="email-login">
            <p className="email-login-label">Email</p>
            <input type="text" className="email-login-field" required name="email"/>
          </div>
  
          <div className="password-login">
            <p className="password-login-label">Password</p>
            <input type={passVisibilty ? "text" : "password"} className="password-login-field" required name="password"/>
            <button
              className="pass-visibility-login"
              onClick={() => handlePassVisbility()}
              type="button"
            >
              {passVisibilty ? (
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
            <div className="error-message-login">
              <p>{error}</p>
            </div>
          )}
          <button type="submit" className="login-button">
            <span>Login</span>
          </button>
  
          </form>
  
          <p className="register">
            Don't have an account? <Link to={'/register'} >Register</Link>
          </p>
        </div>
      </>
    );
  }
}

export default Login;
