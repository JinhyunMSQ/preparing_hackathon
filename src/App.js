import styled from "styled-components";
import TodoList from "./TodoList";
import { useState } from "react";

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
    <Container>
      <form onSubmit={appendTodo}>
        <TodoInput value={inputString} onChange={handleInput} />
        <button type="submit">추가</button>
      </form>
      <SearchContainer>
        <SearchInput value={searchString} onChange={handleSearchInput} placeholder="검색" />
        <SearchButton>검색</SearchButton>
      </SearchContainer>
      <TodoList todoList={filteredTodoList} handleDelete={handleDelete} toggleComplete={toggleComplete} updateTodo={updateTodo} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 70%;
  height: 100vh;
  margin: auto;
`;

const TodoInput = styled.input`
  width: 100%;
  height: 32px;
  margin: 100px;
  border-radius: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

const SearchInput = styled.input`
  width: 200px;
  height: 32px;
  margin-right: 10px;
  border-radius: 10px;
  padding: 0 10px;
`;

const SearchButton = styled.button`
  height: 32px;
  border-radius: 10px;
  padding: 0 15px;
`;
