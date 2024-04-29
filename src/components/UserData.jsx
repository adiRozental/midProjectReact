//src/components/UserData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function UserData ({ user,todos, selectedUser, onUpdateUser, onDeleteUser, onSelectUser})
{
  const [showMoreData, setShowMoreData] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [uncompletedTodos, setuncompletedTodos] = useState(true);

  useEffect(() => {
      if(user.id  > 10 ){
        const hasUncompletedTodos = todos.some(todo => !todo.completed);
      setuncompletedTodos(hasUncompletedTodos);
      }
      else{
      const todosFromIndex16 = todos.slice(16);
      const hasUncompletedTodos = todosFromIndex16.some(todo => !todo.completed);
      setuncompletedTodos(hasUncompletedTodos);}
  }, [todos]);

   const handleUpdateUser = () => {
        const updatedData = { name: editedName, email: editedEmail }; // Example updated data
        onUpdateUser(user.id, updatedData);
       };
      
   const handleDeleteUser = () => {
        onDeleteUser(user.id);
     };

  const handleToggleMoreData = () => {
    if (user.id < 11)
        setShowMoreData(true);
    console.log(user);
  };
  const handleToggleMoreData2 = () => {
    setShowMoreData(false);
  };
  const handleSelected = () =>{
    onSelectUser(user.id)
  }

  

  return (
    <div 
      style={{ 
        position: 'relative',
        border: uncompletedTodos ? '2px solid #ff6961' : '2px solid #a4d8cd', 
        padding: '10px', 
        margin: '10px 0',  borderRadius: '10px', 
        backgroundColor: selectedUser == user.id ? '#feefe9': 'inherit',//#f7d9c4 #fff0f1
      }} 
      
    >
      <div>
        <label onClick={handleSelected}>ID:</label> <span>{user.id}</span>
      </div>
      <div>
      <label>Name:</label>
        <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} /> <br />
      </div>
      
      
      {showMoreData && (
        <div>
          <label>Street:</label> <span>{user.address.street}</span>
          <br />
          <label>City:</label> <span>{user.address.city}</span>
          <br />
          <label>Zip Code:</label> <span>{user.address.zipcode}</span>
        </div>
      )}
      
      <div style={{
    bottom: '10px',
    right: '20px'}} >
      <button onMouseEnter={handleToggleMoreData} onClick={handleToggleMoreData2}> {!showMoreData ? 'Show more data' : 'Hide data'}</button>
      <button onClick={handleUpdateUser}>Update</button>
      <button onClick={handleDeleteUser}>Delete</button>  
      </div>
      
    </div>
  );
};


