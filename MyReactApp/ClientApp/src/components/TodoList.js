// TodoList.js
import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodoText, completed: false }]);
      setNewTodoText('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const handleUpdateTodo = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            editing={editingTodoId === todo.id}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
            onUpdate={(newText) => handleUpdateTodo(todo.id, newText)}
            onEdit={() => setEditingTodoId(todo.id)}
            onCancelEdit={() => setEditingTodoId(null)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
