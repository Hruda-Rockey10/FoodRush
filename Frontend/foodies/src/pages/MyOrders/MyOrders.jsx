import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import Parcel from '../../assets/parcel.png';
import { orderController } from '../../controllers/orderController';
import { useLoading } from '../../hooks/useLoading';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './MyOrders.css';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const { loading, error, startLoading, stopLoading, setLoadingError } = useLoading();

  const fetchOrders = useCallback(async () => {
    startLoading();
    
    const onSuccess = (orders) => {
      setData(orders);
      stopLoading();
    };
    
    const onError = (error) => {
      console.error('Failed to fetch orders:', error);
      setLoadingError(error.message || 'Failed to fetch orders');
    };
    
    await orderController.getUserOrders(token, onSuccess, onError);
  }, [token, startLoading, stopLoading, setLoadingError]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, fetchOrders]);

  if (loading) {
    return <LoadingSpinner text="Loading your orders..." fullScreen />;
  }

  if (error) {
    return (
      <div className="my-orders-wrapper">
        <h2 className="my-orders-title">My Orders</h2>
        <div className="error-message">
          <h3>Error Loading Orders</h3>
          <p>{error}</p>
          <button onClick={fetchOrders}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-wrapper">
      <h2 className="my-orders-title">My Orders</h2>
      <div className="orders-table">
        {data.map((order, index) => (
          <div className="order-row" key={index}>
            <div className="order-col.parcel">
              <img src={Parcel} alt="parcel" height={48} width={48}/>
            </div>
            <div className="order-col items">
              {order.orderedItems.map((item, idx) => (
                <span key={idx}>
                  {item.name} × {item.quantity}
                  {idx !== order.orderedItems.length - 1 && ', '}
                </span>
              ))}
            </div>
            <div className="order-col amount">₹{order.amount.toFixed(2)}</div>
            <div className="order-col count">Items: {order.orderedItems.length}</div>
            <div className={`order-col status ${order.orderStatus.toLowerCase()}`}>
              ● {order.orderStatus}
            </div>
            <div className="order-col refresh">
              <button onClick={fetchOrders} title="Refresh Order">
                ↻
              </button>
            </div>
          </div>
        ))}
        {data.length === 0 && <div className="no-orders">No orders yet.</div>}
      </div>
    </div>
  );
};

export default MyOrders;
