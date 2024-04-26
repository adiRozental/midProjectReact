// src/components/TodoList.js
import React from 'react';

const TodoList = ({ todos, onCompleteTodo }) => {
  console.log("whattt", todos)
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '(Completed)' : '(Uncompleted)'}
            {!todo.completed && (
              <button onClick={() => onCompleteTodo(todo.id)}>
                Mark Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
