import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserData from './UserData';
import TodoList from './TodoList';
import PostList from './PostList';
import { 
  fetchUsers, 
  fetchPosts, 
  fetchTodos, 
  markTodoCompleted, 
  updateUser, 
  deleteUser, 
  addPost, 
  addTodo,
  addUser
} from '../services/utils';


export default function MainComp() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  const [showAddUserForm, setShowAddUserForm] = useState(false); 
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleAddUserClick = () => {
    setShowAddUserForm(true); 
  };

  const handleAddUser = async () => {
    const newUser = {
      id: users.length +1000+ 1, // Assign a unique ID (assuming IDs are sequential)
      name: newUserName,
      email: newUserEmail,
    };
  
    setUsers(prevUsers => [...prevUsers, newUser]);
    await addUser(newUser);
    // Clear input fields after adding user
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserForm(false);
  };

  const handleAddTodo = async (todo) => {
    await addTodo(todo);
    setTodos(prevTodos=> [...prevTodos, todo]);
  };

  const handleAddPost = async (post) => {
    await addPost(post);
    setPosts(prevPosts=> [...prevPosts, post]);
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
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          return { ...user, ...updatedUserData };
        }
        return user;
      });
    });
    await updateUser(updatedUserData);
  };

  const handleDeleteUser = async (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    await deleteUser(userId);
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
        
          <UserList users={users} selectedUser ={selectedUserId} onAddUser = {handleAddUserClick} onSelectUser={handleSelectUser} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} todos={todos}/>
        </div>
      </div>
      
          {!showAddUserForm && selectedUser && (
            <div style={{ flex: 1, marginLeft: '10px'}}>     
                   <TodoList todos={todos.filter(todo => todo.userId === selectedUser.id).splice((selectedUser.id > 10 ? 0 : 16))} onAddTodo={handleAddTodo} onCompleteTodo={handleCompleteTodo} userId={selectedUser.id}/>
                   <PostList posts={posts.filter(post => post.userId === selectedUser.id).splice((selectedUser.id > 10 ? 0 : 6))} onAddPost={handleAddPost}  userId={selectedUser.id}/>
             </div>

          )}
      
        {showAddUserForm && (
          <div style={{ flex: 1, paddingLeft: '5px', margin:'10px'}}>
            <h3>New User:</h3>
          <div style={{ border: '2px solid black', padding: '10px', borderRadius: '10px'}}>
            <div style={{ marginBottom: '5px' }}> {/* Added marginBottom */}
              Name: 
              <input  style={{ marginLeft: '10px' }}
                type="text" 
                placeholder="Name" 
                value={newUserName} 
                onChange={(e) => setNewUserName(e.target.value)} 
              />
            </div>
            <div style={{ marginBottom: '10px' }}> {/* Added marginBottom */}
              Email: 
              <input style={{ marginLeft: '10px' }}
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

