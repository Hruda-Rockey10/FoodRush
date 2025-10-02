import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();


  const { foodList, increaseQty, decreaseQty, removeItem, quantities } = useContext(StoreContext);

  const cartItems = foodList.filter(food => quantities[food.id] > 0);
  const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-page py-5">
      <div className="container py-5">
        {cartItems.length === 0 ? (
          <div className="text-center text-white mt-5">
            <h3>Your cart is currently empty</h3>
            <Link to="/explore" className="btn custom-gold-btn mt-4">
              <i className="bi bi-compass me-2"></i>Explore Menu
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-white">Your Cart</h3>
                <span className="text-gold">
                  {Object.values(quantities).reduce((a, b) => a + b, 0)} items
                </span>
              </div>

              <div className="d-flex flex-column gap-4">
                {cartItems.map(food => (
                  <div className="glass-card d-flex align-items-center p-3" key={food.id}>
                    <div className="cart-img-wrapper">
                      <img src={food.imageUrl} alt={food.name} className="rounded" width={80} height={80} />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1 text-white">{food.name}</h6>
                      <small className="text-gold">{food.category}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button className="qty-btn" onClick={() => decreaseQty(food.id)}>-</button>
                      <input className="qty-input" value={quantities[food.id]} readOnly />
                      <button className="qty-btn" onClick={() => increaseQty(food.id)}>+</button>
                    </div>
                    <div className="fw-semibold text-white ms-3">
                      ₹{(food.price * quantities[food.id]).toFixed(2)}
                    </div>
                    <button className="btn btn-sm btn-danger ms-3" onClick={() => removeItem(food.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Card */}
            <div className="col-lg-4">
              <div className="glass-card p-4">
                <h5 className="text-white mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2 text-light">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 text-light">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 text-light">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <hr className="border-light" />
                <div className="d-flex justify-content-between fw-bold text-white mb-3">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <button className="btn custom-gold-btn w-100 mt-2" onClick={() => navigate('/order')}>
                  <i className="bi bi-send me-2"></i> Proceed To Checkout
                </button>

                <div className="d-flex justify-content-center mt-2">
                  <i className="bi bi-shield-check text-success me-2"></i>
                  <small className="text-light">Secure checkout</small>
                </div>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
