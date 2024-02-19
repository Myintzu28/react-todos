import React, { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo
    };

    // add the todo to the List
    setList([...list, newTodo]);

    // clear input box
    setInput("");
  };

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);

    setList(newList);
  };

  const handleEdit = (id, todo) => {
    setEditMode(id);
    setEditValue(todo);
  };

  const handleSaveEdit = (id) => {
    const updatedList = list.map((todo) =>
      todo.id === id ? { ...todo, todo: editValue } : todo
    );
    setList(updatedList);
    setEditMode(null);
    setEditValue("");
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => addTodo(input)}>Add</button>
      </div>

      <ul>
        {list.map((todo) => (
          <li key={todo.id}>
            {editMode === todo.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                {todo.todo}
                <button onClick={() => handleEdit(todo.id, todo.todo)}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)}>×</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
