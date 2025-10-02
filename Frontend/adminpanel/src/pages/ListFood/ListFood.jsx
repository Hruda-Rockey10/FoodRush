import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteFood, getFoodList } from '../../services/foodService';
import Chopstick from '../../assets/chopstick.png';

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error('Error fetching food list');
    }
  };

  const removeFood = async (id) => {
    try {
      const success = await deleteFood(id);
      if (success) {
        toast.success('Food item deleted successfully');
        fetchList();
      } else {
        toast.error('Failed to delete food item');
      }
    } catch (error) {
      toast.error('Error deleting food item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container py-5" style={{ minHeight: '100vh' }}>
      <div
        className="card shadow-sm p-4"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '1rem' }}
      >
        <h5 className="mb-4 text-dark fw-bold"> All Food Items <img src={Chopstick} alt="" height={30} width={30} /></h5>
        <table className="table table-hover table-borderless">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    width={60}
                    height={60}
                    style={{ borderRadius: '10px', objectFit: 'cover' }}
                  />
                </td>
                <td className="fw-semibold text-dark">{item.name}</td>
                <td className="text-dark">{item.category}</td>
                <td className="text-dark">&#8377;{item.price}.00</td>
                <td>
                  <i
                    className="bi bi-x-circle-fill text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeFood(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFood;
