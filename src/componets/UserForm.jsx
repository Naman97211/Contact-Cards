import React, { useState, useEffect } from "react";

export default function UserForm({ onAddUser, editingUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Fill form when editing
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [editingUser]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = "Invalid email";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(phone.replace(/\D/g, "")))
      newErrors.phone = "Invalid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddUser({ name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Full Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="john@example.com"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label>Phone</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="9876543210"
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <button type="submit" className="btn">
        {editingUser ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
}
