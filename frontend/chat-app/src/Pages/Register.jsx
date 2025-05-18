import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { registerRoute } from "../utils/APIRoutes";
function Register() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validate()) return;
  
    try {
      const { userName, email, password } = userInfo;
  
      const response = await fetch(registerRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (data.status === false) {
        toast.error(data.message || "Registration failed");
      } else if (data.status === true) {
        toast.success("User created successfully");
  
        setUserInfo({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
  
        toast.info("Navigating to login in a moment...");
  
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  

  const validate = () => {
    const { userName, email, password, confirmPassword } = userInfo;

    const usernameRegex = /[a-zA-Z]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (userName.length < 3 || !usernameRegex.test(userName)) {
      toast.error(
        "Username must be at least 3 characters and contain at least one alphabet."
      );
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 8+ characters, with uppercase, lowercase, number & special char."
      );
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Register Here
        </h2>

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="userName"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
          {/* Info Alert Box */}
          <div
            className="flex items-start p-4 mb-6 text-sm text-blue-800 bg-blue-50 rounded-lg"
            role="alert"
          >
            <InformationCircleIcon className="w-5 h-5 mr-3 mt-1 text-blue-500" />
            <div>
              <p className="font-semibold mb-1">Registration Guidelines:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Username must be at least 3 characters and contain letters.
                </li>
                <li>Provide a valid email address.</li>
                <li>
                  Password must be 8+ characters with uppercase, lowercase,
                  number, and special character.
                </li>
                <li>Confirm Password must match Password.</li>
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Create User
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
