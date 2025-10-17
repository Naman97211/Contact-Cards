import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import "./ContactCardsApp.css";

export default function ContactCardsApp() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);


  useEffect(() => {
    try {
      const savedContacts = JSON.parse(localStorage.getItem("contacts"));
      if (savedContacts && Array.isArray(savedContacts)) {
        setUsers(savedContacts);
      }
    } catch (err) {
      console.error("Error loading contacts:", err);
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(users));
  }, [users]);

  const handleAddUser = (user) => {
    if (editingUser) {

      const updated = users.map((u) =>
        u.id === editingUser.id ? { ...u, ...user } : u
      );
      setUsers(updated);
      setEditingUser(null);
    } else {
  
      const newUser = { ...user, id: Date.now().toString() };
      setUsers([...users, newUser]);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
  };

  return (
    <div className="app-container">
      <h1 className="heading">📇 Contact Cards</h1>
      <p className="subheading">Create, edit, and manage your contacts</p>

      <div className="card-grid">
        <div className="form-card">
          <h2>{editingUser ? "Edit Contact" : "Add New Contact"}</h2>
          <UserForm onAddUser={handleAddUser} editingUser={editingUser} />
        </div>

        <div className="list-card">
          <h2>Contact List</h2>
          <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
