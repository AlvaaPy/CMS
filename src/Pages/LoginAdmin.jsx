import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Impor UserContext

function LoginAdmin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Gunakan context untuk set data pengguna

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/admin', formData);

      if (response.status === 200) {
        alert(response.data.msg || "Login berhasil");
        setUser(response.data.admin); // Update context pengguna dengan data admin
        navigate('/CMS');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || 'Kesalahan saat login');
      } else {
        console.error('Error:', error.message);
        setError('Terjadi kesalahan saat mengirim data.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white">LOGIN CMS ADMIN</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-400">
            Butuh bantuan?{' '}
            <a href="#" className="text-indigo-400 hover:underline">
              Hubungi Dukungan
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
