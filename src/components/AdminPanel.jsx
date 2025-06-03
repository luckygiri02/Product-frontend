import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel({ auth }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        alert("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2196F3" }}>
        Admin Panel - Manage Products
      </h2>

      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <button
          onClick={() => navigate("/add")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add New Product
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>In Stock</th>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>Rs {product.price}</td>
                <td style={tdStyle}>{product.category}</td>
                <td style={tdStyle}>{product.inStock ? "Yes" : "No"}</td>
                <td style={tdStyle}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "50px", borderRadius: "4px" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => navigate(`/edit/${product._id}`)}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>{" "}
                  <button
                    onClick={() => handleDelete(product._id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  backgroundColor: "#2196F3",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

const editButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px",
};

const deleteButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default AdminPanel;
