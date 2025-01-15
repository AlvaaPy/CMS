import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Import UserContext

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setPengguna } = useContext(UserContext); // Use setPengguna to store regular user data

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);

      if (response.status === 200) {
        const { accessToken, name } = response.data; // Get accessToken and name
        localStorage.setItem('accessToken', accessToken); // Store token in localStorage
        setPengguna({ name }); // Set regular user name in context
        alert("Login successful");
        navigate('/Home'); // Navigate to the Home page
      }
    } catch (error) {
      if (error.response) {
        // Error from server response
        alert(error.response.data.msg || 'Error saat login');
      } else {
        // Other errors
        console.error('Error:', error.message);
        alert('Terjadi kesalahan saat mengirim data.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          LOGIN
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
        <div className="">
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Are you Admin?{" "}
              <Link to="/LoginAdmin" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Don't have an Account?{" "}
              <Link to="/Registrasi" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
