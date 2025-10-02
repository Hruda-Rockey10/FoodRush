import React, { useState } from 'react';
import Upload from '../../assets/uploadFile.png';
import Chef from '../../assets/chef.png';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';

const AddFood = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Please upload an image');
    try {
      await addFood(data, image);
      toast.success('Food item added!');
      setData({ name: '', description: '', price: '', category: '' });
      setImage(null);
    } catch {
      toast.error('Error adding food');
    }
  };

  return (
    <div className="container">
      <div className="card p-4 mx-auto" style={{ maxWidth: 600 }}>
        <div className="d-flex align-items-center mb-4">
          <img src={Chef} alt="Chef" width={48} height={48} className="me-2" />
          <h4 className="fw-bold mb-0">Add New Food Item</h4>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Upload */}
          <div className="text-center mb-3">
            <label htmlFor="image" style={{ cursor: 'pointer' }}>
              <img
                src={image ? URL.createObjectURL(image) : Upload}
                alt="Upload"
                width={100}
                style={{ borderRadius: '10px' }}
              />
              <div className="text-muted">Click to upload</div>
            </label>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" value={data.name} onChange={handleChange} placeholder="Enter food name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={data.description} onChange={handleChange} rows="3" placeholder="Enter description" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select className="form-select" name="category" value={data.category} onChange={handleChange} required>
              
              <option value="">-- Select Category --</option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Snacks">Snacks</option>
              <option value="Sweets">Sweets</option>
              <option value="Beverages">Beverages</option>
              <option value="Hakka_Noodles">Chinese</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Biryani">Biryani</option>
              <option value="Street Food">Street Food</option>
              <option value="Sweets">Desserts</option>
              <option value="Thali">Thali</option>
              <option value="Fussion Food">Fusion Food</option>
              <option value="Healthy">Healthy</option>

            </select>
          </div>
          <div className="mb-4">
            <label className="form-label">Price (₹)</label>
            <input type="number" className="form-control" name="price" value={data.price} onChange={handleChange} placeholder="₹200" required />
          </div>

          <button type="submit" className="btn text-white fw-semibold" style={{ backgroundColor: '#E2725B' }}>
            Save Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
