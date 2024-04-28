//src/components/UserData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserData = ({ user,todos, selectedUser, onUpdateUser, onDeleteUser, onSelectUser}) => {
  const [showMoreData, setShowMoreData] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [uncompletedTodos, setuncompletedTodos] = useState(true);

  useEffect(() => {
    console.log('hey', todos);
    setuncompletedTodos(false)
    todos.splice(16).forEach(todo => { if (todo.completed == false) setuncompletedTodos(true); 
      
    });
    console.log(uncompletedTodos)
  }, [todos]);

   const handleUpdateUser = () => {
        axios.patch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
          name: editedName,
          email: editedEmail
        }).then(response => {
          // Handle successful update here
        //   onUpdateUser(response.data); // Assuming onUpdateUser function updates the user state
          console.log('User updated successfully');
        }).catch(error => {
          // Handle update error here
          console.error('Error updating user:', error);
        });
        const updatedData = { name: editedName, email: editedEmail }; // Example updated data
        onUpdateUser(user.id, updatedData);
       };
      
   const handleDeleteUser = () => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
        .then(() => {
          // Handle successful deletion here
        //   onDeleteUser(user.id); // Assuming onDeleteUser function deletes the user from state
          console.log('User deleted successfully');
        }).catch(error => {
          // Handle deletion error here
          console.error('Error deleting user:', error);
        });
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
      {/* <h5>{user.name}</h5>  */}
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
      <button onMouseEnter={handleToggleMoreData} onClick={handleToggleMoreData2}>show more data</button>
      <button onClick={handleUpdateUser}>Update</button>
      <button onClick={handleDeleteUser}>Delete</button>  
      </div>
      
    </div>
  );
};

export default UserData;

