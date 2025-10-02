import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import Logo from "../../assets/logo.png";
import { StoreContext } from '../../components/context/StoreContext';
import InvoiceDownload from '../../components/InvoiceDownload/InvoiceDownload';
import { orderController } from '../../controllers/orderController';
import { useNavigate } from "react-router-dom"

const PlaceOrder = () => {
  const { foodList, quantities , setQuantities , token} = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    state: '',
    city: '',
    country: '',
    zip: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    
    const orderData = orderController.formatOrderData(data, cartItems, quantities, total);
    
    const onSuccess = () => {
      navigate("/myorders");
    };
    
    const onError = (error) => {
      console.error('Order failed:', error);
    };
    
    const onCancel = () => {
      // Handle payment cancellation
    };
    
    await orderController.processOrder(orderData, token, data, onSuccess, onError, onCancel);
  };


  const cartItems = foodList.filter(food => quantities[food.id] > 0);
  const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="placeorder-page container py-5">
      <div className="text-center mb-5">
        <img src={Logo} alt="Company Logo" className="checkout-logo" height={108} width={108} />
      </div>

      <div className="row g-5">
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 text-gold fw-bold fs-4">Billing Address</h4>
          <form className="glass-card p-4 rounded" onSubmit={onSubmitHandler}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label text-light">First name</label>
                <input type="text" className="form-control glass-input" value={data.firstName} name="firstName" onChange={onChangeHandler} required />
              </div>

              <div className="col-sm-6">
                <label className="form-label text-light">Last name</label>
                <input type="text" className="form-control glass-input" value={data.lastName} name="lastName" onChange={onChangeHandler} required />
              </div>

              <div className="col-12">
                <label className="form-label text-light">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent text-light">@</span>
                  <input type="email" className="form-control glass-input" name="email" value={data.email} onChange={onChangeHandler} required />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label text-light">Phone Number</label>
                <input
                  type="number"
                  className="form-control glass-input"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label text-light">Address</label>
                <input type="text" className="form-control glass-input" name="address" value={data.address} onChange={onChangeHandler} required />
              </div>

              <div className="col-md-5">
                <label className="form-label text-light">State</label>
                <select className="form-select glass-input" name="state" value={data.state} onChange={onChangeHandler} required>
                  <option value="">Choose...</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label text-light">City</label>
                <select className="form-select glass-input" name="city" value={data.city} onChange={onChangeHandler} required>
                  <option value="">Choose...</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label text-light">Zip</label>
                <input
                  type="number"
                  className="form-control glass-input"
                  name="zip"
                  value={data.zip}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>

            <hr className="my-4 border-light" />

            <button className="btn custom-checkout-btn w-100" type="submit">
              Continue to Checkout
            </button>
          </form>
        </div>

        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3 text-white">
            <span className="mb-1 text-gold fw-bold fs-4">Your Cart</span>
            <span className="badge bg-gold rounded-pill">{cartItems.length}</span>
            <span>
              <InvoiceDownload
                cartItems={cartItems.map(item => ({
                  name: item.name,
                  quantity: quantities[item.id],
                  price: item.price,
                }))}
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                total={total}
              />
            </span>
          </h4>

          <div className="glass-card p-3 mb-3">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle"
              >
                <div>
                  <h6 className="my-0 text-white">{item.name}</h6>
                  <small className="text-light">Qty: {quantities[item.id]}</small>
                </div>
                <span className="text-white fw-semibold">₹{(item.price * quantities[item.id]).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="glass-card p-3">
            <div className="d-flex justify-content-between text-light mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between text-light mb-2">
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between text-light mb-3">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <hr className="border-light" />
            <div className="d-flex justify-content-between text-white fw-bold fs-6">
              <span>Total</span>
              <span className="text-gold">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
