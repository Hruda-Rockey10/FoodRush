import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);

  const toggleDescription = () => setShowFullDesc(!showFullDesc);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="food-card">
        <Link to={`/food/${id}`}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt={name || "Food Item"}
            style={{
              height: "200px",
              objectFit: "cover",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px"
            }}
          />
        </Link>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title food-title">{name}</h5>

          <div style={{ minHeight: '110px' }}>
            <p
              className={`card-text food-description ${showFullDesc ? '' : 'truncate-description'}`}
              style={{ fontSize: '0.9rem' }}
            >
              {description}
            </p>
            {description.length > 120 && (
              <button onClick={toggleDescription} className="toggle-desc-btn">
                {showFullDesc ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3 mt-auto">
            <span className="h6 mb-0 text-light">₹{price}</span>
            <div className="rating text-warning" style={{ fontSize: "0.85rem" }}>
              ★★★★☆ <small className="rating-number">(4.2)</small>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/food/${id}`} className="btn btn-outline-light btn-sm" type="button">
              View Food
            </Link>

            {quantities[id] > 0 ? (
              <div className="d-flex align-items-center gap-2">
                <button
                  className="icon-button"
                  onClick={() => decreaseQty(id)}
                  title="Remove"
                >
                  <i className="bi bi-dash-circle text-light"></i>
                </button>

                <span className="fw-bold text-light">{quantities[id]}</span>

                <button
                  className="icon-button"
                  onClick={() => increaseQty(id)}
                  title="Add"
                >
                  <i className="bi bi-plus-circle text-light"></i>
                </button>
              </div>
            ) : (
              <button
                className="icon-button"
                onClick={() => increaseQty(id)}
                title="Add to Cart"
              >
                <i className="bi bi-plus-circle text-light"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
