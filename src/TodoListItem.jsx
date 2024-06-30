import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const TodoListItem = ({ id, body, handleDelete, toggleComplete, updateTodo, completed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(body);

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  const handleSave = () => {
    updateTodo(id, editText);
    setIsEditing(false);
  };

  return (
    <Box completed={completed}>
      {isEditing ? (
        <>
          <input type="text" value={editText} onChange={handleEditChange} />
          <button onClick={handleSave}>저장</button>
        </>
      ) : (
        <>
          <p>{body}</p>
          <button onClick={() => setIsEditing(true)}>수정</button>
          <button onClick={() => toggleComplete(id)}>완료</button>
          <button onClick={() => handleDelete(id)}>삭제</button>
        </>
      )}
    </Box>
  );
};

const Box = styled.div`
  background-color: white;
  padding: 5px 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${props => props.completed && css`
    color: grey;
    text-decoration: line-through;
  `}
`;

export default TodoListItem;
