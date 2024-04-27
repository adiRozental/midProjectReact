//src/components/UserData.js
import React, { useState } from 'react';
import axios from 'axios';


const UserData = ({ user,selectedUser, onUpdateUser, onDeleteUser, onSelectUser}) => {
  const [showMoreData, setShowMoreData] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);

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
        border: user.uncompletedTodos ? '2px solid red' : '2px solid #c9e4de', 
        padding: '10px', 
        margin: '10px 0',  borderRadius: '10px', 
        backgroundColor: selectedUser == user.id ? '#fff0f1': 'inherit',//#f7d9c4
      }} 
      onMouseEnter={handleToggleMoreData} 
      onClick={handleToggleMoreData2}
      //onMouseOut={handleToggleMoreData2}
    >
      <h2>{user.name}</h2>
      <button onClick={handleUpdateUser}>Update</button>
      <button onClick={handleDeleteUser}>Delete</button>  
      <div>
        <label onClick={handleSelected}>ID:</label> <span>{user.id}</span>
      </div>
      <div>
      <label>Name:</label>
        <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
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
      
    </div>
  );
};

export default UserData;

