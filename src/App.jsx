// src/App.js
import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserData from './components/UserData';
import TodoList from './components/TodoList';
import PostList from './components/PostList';
import { fetchUsers, fetchPosts, fetchTodos, markTodoCompleted } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('1');
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  const [showAddUserForm, setShowAddUserForm] = useState(false); // State to control the visibility of the add user form
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleAddUserClick = () => {
    setShowAddUserForm(true); // Show the add user form when the button is clicked
  };

  const handleAddUser = () => {
    // Here you can implement the logic to add a new user
    // You can use props to handle adding new user data to the list
    // For now, let's just log the new user data to the console
    console.log('New User Name:', newUserName);
    console.log('New User Email:', newUserEmail);
    const newUser = {
      id: users.length +1000+ 1, // Assign a unique ID (assuming IDs are sequential)
      name: newUserName,
      email: newUserEmail,
      // Add any other properties you want to include for the new user
    };
  
    
    // Update the users state by adding the new user to the existing list
    setUsers(prevUsers => [...prevUsers, newUser]);
  
    // Clear input fields after adding user
    setNewUserName('');
    setNewUserEmail('');
    // Hide the add user form after adding user
    setShowAddUserForm(false);
  };
  const handleAddTodo = (todo) => {
    
    console.log('New todo:', todo);
    setTodos(prevTodos=> [...prevTodos, todo]);
    };
  

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);

    const fetchedPosts = await fetchPosts();
    setPosts(fetchedPosts);

    const fetchedTodos = await fetchTodos();
    setTodos(fetchedTodos);
  };

  const handleSelectUser = async (userId) => {
    setSelectedUserId(userId);
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    // Update user data
    // You need to implement the logic for updating user data
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          return { ...user, ...updatedUserData };
        }
        return user;
      });
    });
    console.log("Updating user data:", userId, updatedUserData);
  };

  const handleDeleteUser = (userId) => {
    // Filter out the user with the specified userId
    const updatedUsers = users.filter(user => user.id !== userId);
    // Update the users state with the filtered list
    setUsers(updatedUsers);
  };
  

  const handleCompleteTodo = async (todoId) => {
    await markTodoCompleted(todoId);
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div style={{ display: 'flex', fontSize: '1.2rem'}}>
      <div style={{ flex: 1 }}>
        
        <div style={{ border: '2px solid black', padding: '10px',  borderRadius: '40px' }}>
        {/* <button onClick={handleAddUserClick}>Add New User</button> */}
          <UserList users={users} onAddUser = {handleAddUserClick} onSelectUser={handleSelectUser} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser}/>
        </div>
      </div>
      
          {!showAddUserForm && selectedUser && (
            <div style={{ flex: 1, marginLeft: '10px'}}>     
                   <TodoList todos={todos.filter(todo => todo.userId === selectedUser.id).splice(16)} onAddTodo={handleAddTodo} onCompleteTodo={handleCompleteTodo} userId={selectedUser.id}/>
              {/* <PostList posts={posts.filter(post => post.userId === selectedUser.id)} /> */}
             </div>

          )}
      
        {showAddUserForm && (
          <div style={{ flex: 1, paddingLeft: '5px'}}>
          <div style={{ border: '2px solid black', padding: '10px', borderRadius: '10px'}}>
            <div style={{ marginBottom: '5px' }}> {/* Added marginBottom */}
              Name: 
              <input 
                type="text" 
                placeholder="Name" 
                value={newUserName} 
                onChange={(e) => setNewUserName(e.target.value)} 
              />
            </div>
            <div style={{ marginBottom: '10px' }}> {/* Added marginBottom */}
              Email: 
              <input 
                type="email" 
                placeholder="Email" 
                value={newUserEmail} 
                onChange={(e) => setNewUserEmail(e.target.value)} 
              />
            </div>
            <div style={{ marginLeft: '10px' }}>
              <button style={{ marginRight: '10px' }} onClick={handleAddUser}>Add</button>
              <button onClick={() => setShowAddUserForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
        
        )}
      
      
    </div>
  );
}

export default App;
