import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../Component/Navbar";

function UserTrainingTopics() {
  const [topik, setTopik] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDivisi, setSelectedDivisi] = useState("All");

  const divisions = [
    "All",
    "Marketing",
    "IT",
    "Human Capital",
    "Product",
    "Redaksi",
  ];

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from multiple endpoints
        const [
          marketingResponse,
          itResponse,
          humanCapitalResponse,
          productResponse,
          redaksiResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/marketing"),
          axios.get("http://localhost:5000/it"),
          axios.get("http://localhost:5000/humanCapital"),
          axios.get("http://localhost:5000/product"),
          axios.get("http://localhost:5000/redaksi"),
        ]);

        // Combine data from all sources
        const combinedData = [
          ...marketingResponse.data,
          ...itResponse.data,
          ...humanCapitalResponse.data,
          ...productResponse.data,
          ...redaksiResponse.data,
        ];

        setTopik(combinedData);
        setFilteredTopics(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle filtering based on selected division
  useEffect(() => {
    if (selectedDivisi === "All") {
      setFilteredTopics(topik);
    } else {
      setFilteredTopics(
        topik.filter((item) => item.nama_divisi === selectedDivisi)
      );
    }
  }, [selectedDivisi, topik]);

  const renderMedia = (item) => {
    if (item.foto_topik) {
      const fileExtension = item.foto_topik.split(".").pop().toLowerCase();

      if (["mp4", "webm", "ogg"].includes(fileExtension)) {
        return (
          <video controls className="w-full h-40 object-cover rounded-lg">
            <source
              src={`http://localhost:5000/uploads/${item.foto_topik}`}
              type={`video/${fileExtension}`}
            />
            Your browser does not support the video tag.
          </video>
        );
      } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        return (
          <img
            src={`http://localhost:5000/uploads/${item.foto_topik}`}
            alt="Media"
            className="w-full h-40 object-cover rounded-lg"
          />
        );
      } else {
        return (
          <div className="text-gray-500 italic">Unsupported media type</div>
        );
      }
    } else {
      return <div className="text-gray-500 italic">No media available</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-gray-500 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <UserNavbar/>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
          <div className="p-8 border-b bg-blue-500 text-white">
            <h1 className="text-3xl font-bold text-center">
              Daftar Topik Training
            </h1>

            <div className="mt-6 mb-4">
              <label className="mr-2 font-semibold">Filter by Divisi:</label>
              <select
                value={selectedDivisi}
                onChange={(e) => setSelectedDivisi(e.target.value)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {[...new Set(divisions)].map((divisi) => (
                  <option key={divisi} value={divisi}>
                    {divisi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredTopics.map((item) => (
              <div
                key={`${item.id}-${item.nama_divisi}`} // Ensure uniqueness by combining id and division
                className="bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {item.judul}
                </h2>
                <p className="text-gray-700 mb-4">{item.deskripsi}</p>
                {renderMedia(item)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTrainingTopics;
