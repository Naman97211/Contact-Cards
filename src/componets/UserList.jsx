import React from "react";
import ContactCard from "./ContactCard";

export default function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0)
    return <p className="no-data">No contacts yet. Add your first contact!</p>;

  return (
    <div className="user-list">
      {users.map((user) => (
        <ContactCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
