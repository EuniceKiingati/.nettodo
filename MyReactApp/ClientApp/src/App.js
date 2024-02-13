import React from 'react';
import './App.css';
import TodoList from './components/TodoList'; // Import the TodoList component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Todo App</h1>
        <TodoList /> {/* Render the TodoList component */}
      </header>
    </div>
  );
}

export default App;
