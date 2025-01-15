import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Header from '../Sidebar';
import Modal from '../../../Component/Modal';

function Product() {
  const [topikProduct, setTopikProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product');
        setTopikProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    setModalData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      setTopikProduct(topikProduct.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleModalSubmit = async (data) => {
    try {
      if (modalData) {
        // Edit existing record
        await axios.put(`http://localhost:5000/product/${modalData.id}`, data);
        setTopikProduct(
          topikProduct.map((item) =>
            item.id === modalData.id ? { ...item, ...data } : item
          )
        );
      } else {
        // Create new record
        const response = await axios.post('http://localhost:5000/product', data);
        setTopikProduct([...topikProduct, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderMedia = (item) => {
    if (!item.foto_topik) {
      return <span>No media</span>;
    }

    const fileExtension = item.foto_topik.split('.').pop().toLowerCase();
    const fileUrl = `http://localhost:5000/uploads/${item.foto_topik}`;

    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <img src={fileUrl} alt="Media" className="max-h-40 mx-auto" />;
      case 'mp4':
      case 'webm':
        return (
          <video className="max-h-90 mx-auto" controls>
            <source src={fileUrl} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return <a href={fileUrl} target="_blank" rel="noopener noreferrer">View File</a>;
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold">Divisi Product</h1>
            <button
              onClick={handleAdd}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FaPlus className="mr-2" /> Add New Item
            </button>
          </div>
          <div className="p-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Judul</th>
                  <th className="py-3 px-6 text-left">Kategori Topik</th>
                  <th className="py-3 px-6 text-center">Media</th>
                  <th className="py-3 px-6 text-center">Deskripsi</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {topikProduct.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <span className="font-medium">{item.id}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span>{item.judul}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span>{item.nama_divisi}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {renderMedia(item)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span>{item.deskripsi}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={modalData}
      />
    </div>
  );
}

export default Product;
