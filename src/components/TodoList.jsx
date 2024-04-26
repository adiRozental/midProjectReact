// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onCompleteTodo, userId, onAddTodo }) => {
  console.log("whattt", todos)
  const [showAddtodoForm, setshowAddtodoForm] = useState(false); 
  const [newTodo, setNewTodo] = useState(); 

  const handleAddTodoClick = () => {
    setshowAddtodoForm(true); // Show the add user form when the button is clicked
  };
  const handleAddTodo = () => {
    setshowAddtodoForm(false); // Show the add user form when the button is clicked
    const todo = { id: todos.length+100, userId: userId ,title: newTodo };
    onAddTodo(todo);
    setNewTodo("");

  };

  return (
    <div style={{ 
      margin: '10px'
    }}>    
      {!showAddtodoForm && (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{flex: 3, padding: '10px'}}>
              <h3>Todo List - User {userId} :</h3>
            </div>
          
            <div style={{flex: 1, margin: '35px'}}>
              <button  onClick={handleAddTodoClick}>Add</button>
            </div>  
        </div>  
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
          )}
      {showAddtodoForm && (
        <div style={{ flex: 1, paddingLeft: '5px'}}>
          <h3>New Task - User {userId} :</h3>

          <div style={{ border: '2px solid black', padding: '10px', borderRadius: '10px'}}>
            <div style={{ marginBottom: '5px' }}> {/* Added marginBottom */}
              Todo: 
              <input 
                type="text" 
                placeholder="Todo" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
              />
            </div>
            
            <div style={{ marginLeft: '10px' }}>
              <button style={{ marginRight: '10px' }} onClick={handleAddTodo}>Add</button>
              <button onClick={() => setshowAddtodoForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
        
        )}
      
    </div>
  );
};

export default TodoList;
