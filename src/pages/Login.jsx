import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setUserSession } from "../utils/common";
import axios from "axios";
import { get, post } from "../services";

const Login = (props) => {
  const history = useNavigate();
  const email = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const tokenExist = getToken();
  
  useEffect(() => {
        if (tokenExist) {
            history("/suggestions");
        }
    },[])

  // handle button click of login form
  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    const body = {
      email: email.value,
      password: password.value,
    };

    await post("/login", body)
      .then((response) => {
        setLoading(false);
        console.log("respose", response);
        setUserSession(response.data.data.token, response.data.data.user);
        history("/suggestions");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Login to your account</h3>
          <form action="">
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  {...email}
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  {...password}
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </>
              )}
              <div className="flex items-baseline justify-between">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  value={loading ? "Loading..." : "Login"}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
