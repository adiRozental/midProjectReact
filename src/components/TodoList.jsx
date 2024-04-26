// src/components/TodoList.js
import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onCompleteTodo, userId }) => {
  console.log("whattt", todos)
  return (
    <div style={{ 
      margin: '10px'
    }}>

      <div style={{ display: 'flex' }}>
          <div style={{flex: 3, padding: '10px'}}>
            <h3>Todo List - User {userId} :</h3>
          </div>
        
          <div style={{flex: 1, margin: '35px'}}>
            <button  onClick={onCompleteTodo}>Add</button>
          </div>  
      </div>  
      {/* <center>
        <h2>Todo List</h2>
        <h3>User: {userId}</h3>
      </center> */}
      <div style={{ border: '2px solid black',  borderRadius: '40px'} }>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <Todo todo={todo} onCompleteTodo={onCompleteTodo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
