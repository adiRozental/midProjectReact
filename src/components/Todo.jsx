// src/components/Todo.jsx
import React from 'react';

const Todo = ({ todo, onCompleteTodo }) => {
  return (
    <div style={{ 
        border:  '2px solid pink', 
        padding: '10px', 
        marginRight: '20px', marginTop: '10px',  borderRadius: '10px'
      }} >        
        <label style={{ marginRight: '10px' }}><u>Title:</u> </label> <span>{todo.title}</span><br />
        <label style={{ marginRight: '10px' }}><u>Completed:</u> </label> <span>{todo.completed ? 'True' : 'False'}</span>
        {!todo.completed && (
            <button onClick={() => onCompleteTodo(todo.id)} style={{ marginLeft: '30px' }}>
            Mark Completed
            </button>
        )}
        
    </div>
  );
};

export default Todo;
