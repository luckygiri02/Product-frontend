import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>All Products</h2>

      <Link to="/add">
        <button style={addButtonStyle}>+ Add Product</button>
      </Link>

      {products.length === 0 && <p style={emptyText}>No products found.</p>}

      <ul style={listStyle}>
        {products.map((p) => (
          <li key={p._id} style={cardStyle}>
            <img
              src={p.image}
              alt={p.name}
              style={imageStyle}
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
            <div style={infoStyle}>
              <h3 style={productName}>{p.name}</h3>
              <p><strong>Price:</strong> ₹{p.price}</p>
              <p><strong>Category:</strong> {p.category}</p>
              <p><strong>In Stock:</strong> {p.inStock ? "Yes" : "No"}</p>
              <Link to={`/product/${p._id}`} style={viewLink}>View Details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ======= Inline Styles =======

const containerStyle = {
  maxWidth: "800px",
  margin: "30px auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const addButtonStyle = {
  backgroundColor: "#FF7F7F",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  marginBottom: "20px",
};

const emptyText = {
  textAlign: "center",
  color: "#666",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const cardStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "15px",
  marginBottom: "15px",
  backgroundColor: "#F08080",
  boxShadow: "0 0 8px rgba(0,0,0,0.05)",
};

const imageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "5px",
  objectFit: "cover",
  marginRight: "20px",
};

const infoStyle = {
  flex: 1,
};

const productName = {
  margin: "0 0 5px",
};

const viewLink = {
  marginTop: "8px",
  display: "inline-block",
  color: "#007bff",
  textDecoration: "none",
};

export default ProductList;
