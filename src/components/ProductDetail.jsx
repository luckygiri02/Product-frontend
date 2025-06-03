import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>All Products</h2>
        <Link to="/add">
          <button style={addBtnStyle}>Add Product</button>
        </Link>
      </div>

      <div style={gridStyle}>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(p => (
            <div key={p._id} style={cardStyle}>
              <h4 style={productTitle}>{p.name}</h4>
              <p style={priceStyle}>Rs {p.price}</p>
              <Link to={`/product/${p._id}`} style={viewLinkStyle}>View</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  padding: '30px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f7f7f7',
  minHeight: '100vh',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const addBtnStyle = {
  padding: '10px 16px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '14px',
  cursor: 'pointer',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '20px',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
};

const productTitle = {
  marginBottom: '10px',
  fontSize: '18px',
  color: '#333',
};

const priceStyle = {
  marginBottom: '10px',
  color: '#555',
  fontWeight: 'bold',
};

const viewLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default ProductList;
