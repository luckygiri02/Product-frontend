import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm({ auth, editMode }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    inStock: true,
    image: ''
  });

  const categories = ["Household", "Clothing", "Beauty-Product"];
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then(res => res.json())
        .then(data => setForm(data))
        .catch(err => console.error('Error fetching product:', err));
    }
  }, [editMode, id]);

  const save = async () => {
    const method = editMode ? 'PUT' : 'POST';
    const url = `http://localhost:5000/api/products${editMode ? `/${id}` : ''}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...auth })
      });

      if (res.ok) {
        navigate('/admin');
      } else {
        alert('Unauthorized or error occurred');
      }
    } catch (error) {
      alert('Network error or server not reachable');
      console.error('Save error:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{editMode ? 'Edit' : 'Add'} Product</h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          save();
        }}
        style={formStyle}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
          style={inputStyle}
        />

        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
          style={inputStyle}
        >
          <option value="" disabled>Select category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          style={inputStyle}
        />

        <label style={checkboxLabel}>
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={e => setForm({ ...form, inStock: e.target.checked })}
          />
          &nbsp;In Stock
        </label>

        <button type="submit" style={submitButton}>
          {editMode ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '30px',
  backgroundColor: '#FF7F7F',
  borderRadius: '10px',
  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '25px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const checkboxLabel = {
  fontSize: '14px',
  color: '#333',
};

const submitButton = {
  padding: '12px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default ProductForm;
