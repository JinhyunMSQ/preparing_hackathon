import React, { useState } from "react";
import TodoList from "./TodoList";
import './App.css';

const fake = [
  { id: 1, body: "우유 구입", completed: false },
  { id: 2, body: "과제 제출", completed: false },
  { id: 3, body: "시험 준비", completed: false }
];

function App() {
  const [todoList, setTodoList] = useState(fake);
  const [inputString, setInputString] = useState("");
  const [searchString, setSearchString] = useState("");

  const appendTodo = (event) => {
    event.preventDefault();
    const newTodo = [...todoList, { id: Date.now(), body: inputString, completed: false }];
    setTodoList(newTodo);
    setInputString('');
  };

  const handleInput = (event) => {
    setInputString(event.target.value);
  };

  const handleSearchInput = (event) => {
    setSearchString(event.target.value);
  };

  const handleDelete = (id) => {
    const newTodo = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodo);
  };

  const toggleComplete = (id) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const updateTodo = (id, newBody) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return { ...todo, body: newBody };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const filteredTodoList = todoList.filter(todo => todo.body.includes(searchString));

  return (
    <div className="container">
      <form className="form-container" onSubmit={appendTodo}>
        <input className="todo-input" value={inputString} onChange={handleInput} />
        <button className="add-button" type="submit">추가</button>
      </form>
      <div className="search-container">
        <input className="search-input" value={searchString} onChange={handleSearchInput} placeholder="검색" />
        <button className="search-button">검색</button>
      </div>
      <TodoList todoList={filteredTodoList} handleDelete={handleDelete} toggleComplete={toggleComplete} updateTodo={updateTodo} />
    </div>
  );
}

export default App;
