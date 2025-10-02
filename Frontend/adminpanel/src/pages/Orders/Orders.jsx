import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Parcel from '../../assets/parcel.png';

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:8080/api/orders/all');
    setData(response.data);
  };

  const updateStatus = async (event, orderId) => {
    const response = await axios.patch(
      `http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`
    );
    if (response.status === 200) {
      await fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-5" style={{ minHeight: '100vh' }}>
      <div
        className="card shadow-sm p-4"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '1rem' }}
      >
        <h5 className="mb-4 text-dark fw-bold">
          All Orders <img src={Parcel} alt="parcel" height={30} width={30} />
        </h5>
        <div className="table-responsive">
          <table className="table table-hover table-borderless align-middle">
            <thead className="table-light">
              <tr>
                <th>Icon</th>
                <th>Items & Address</th>
                <th>Amount</th>
                <th>Total Items</th>
                <th style={{ minWidth: '180px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={Parcel}
                      alt="parcel"
                      height={42}
                      width={42}
                      style={{ borderRadius: '8px' }}
                    />
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">
                      {order.orderedItems.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x {item.quantity}
                          {idx !== order.orderedItems.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                    <div className="text-muted small">{order.userAddress}</div>
                  </td>
                  <td className="text-dark">&#8377;{order.amount.toFixed(2)}</td>
                  <td className="text-dark">{order.orderedItems.length}</td>
                  <td>
                    <select
                      className="form-select"
                      style={{ minWidth: '160px' }}
                      value={order.orderStatus}
                      onChange={(event) => updateStatus(event, order.id)}
                    >
                      <option value="Food Preparing">Food Preparing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
