import React from "react";
import { Mail, Phone, Edit2, Trash2 } from "lucide-react";

export default function ContactCard({ user, onEdit, onDelete }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="contact-card">
      <div className="avatar">{initials}</div>
      <div className="info">
        <h3>{user.name}</h3>
        <p><Mail size={16} /> {user.email}</p>
        <p><Phone size={16} /> {user.phone}</p>
      </div>

      <div className="actions">
        <button className="edit-btn" onClick={() => onEdit(user)}>
          <Edit2 size={16} />
        </button>
        <button className="delete-btn" onClick={() => onDelete(user.id)}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
