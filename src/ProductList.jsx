// src/ProductList.jsx
import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState([]);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (plant) => {
    if (!addedToCart.includes(plant.name)) {
      dispatch(addItem({ ...plant, quantity: 1 }));
      setAddedToCart([...addedToCart, plant.name]);
    }
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2021/02/03/01/49/peace-lily-5975722_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        }
      ]
    }
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
            <a href="/" onClick={handleHomeClick} className="tag_home_link">
              <div>
                <h3>Paradise Nursery</h3>
                <i>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div className="nav-links">
          <div><a href="#" onClick={handlePlantsClick}>Plants</a></div>
          <div><a href="#" onClick={handleCartClick}><h1 className='cart'>🛒</h1><span className="cart_quantity_count">{totalItems}</span></a></div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2 className="plant_heading">{categoryObj.category}</h2>
              <div className="plant-row">
                {categoryObj.plants.map((plant, i) => (
                  <div key={i} className="plant-card product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-price">{plant.cost}</p>
                    <p><em>{plant.description}</em></p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart.includes(plant.name)}
                      className={`product-button ${addedToCart.includes(plant.name) ? 'added-to-cart' : ''}`}
                    >
                      {addedToCart.includes(plant.name) ? 'Added to Cart' : 'Agregar al Carrito'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
