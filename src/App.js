import React, { useState } from 'react';
import './App.css'; // Pour le style

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Ajouter une tâche
  const addTask = () => {
    if (inputValue.trim() === '') return; // Ignore si vide

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // Basculer état complété
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Supprimer tâche
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">

      <h1>Ma To-Do List testing version</h1>
      
      <div className="input-group">
        <input 
          type="text"
          placeholder="Nouvelle tâche..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()} // Ajouter avec Enter
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

