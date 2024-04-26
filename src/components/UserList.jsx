// src/components/UserList.js
import React, { useState } from 'react';
import UserData from './UserData';

const UserList = ({ users, onAddUser, onUpdateUser, onDeleteUser, onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{flex: 3, padding: '10px'}}>
          Search: <input style={{flex:1}}
            type="text" 
            placeholder="Search by name or email" 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
        </div>
        
        <div style={{flex: 1, padding: '10px'}}>
          <button  onClick={onAddUser}>Add User</button>
        </div>  
          
      </div>
      {filteredUsers.map(user => (
        <UserData 
          key={user.id} 
          user={user} 
          onSelectUser = { onSelectUser}
          onUpdateUser={onUpdateUser} 
          onDeleteUser={onDeleteUser} 
        />
      ))}
    </div>
  );
};

export default UserList;
