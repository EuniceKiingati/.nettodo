// TodoItem.js
import React, { useState } from 'react';

const TodoItem = ({ id, text, completed, editing, onToggleComplete, onDelete, onUpdate, onEdit, onCancelEdit }) => {
  const [updatedText, setUpdatedText] = useState(text);

  const handleInputChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleEditSubmit = () => {
    onUpdate(updatedText);
  };

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      {!editing ? (
        <>
          <input type="checkbox" checked={completed} onChange={onToggleComplete} />
          <span>{text}</span>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      ) : (
        <>
          <input type="text" value={updatedText} onChange={handleInputChange} />
          <button onClick={handleEditSubmit}>Save</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
