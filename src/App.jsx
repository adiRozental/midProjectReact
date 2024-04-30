import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserData from './components/UserData';
import TodoList from './components/TodoList';
import PostList from './components/PostList';
import MainComp from './components/mainComp';
import './App.css'
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
} from './services/utils';


function App() {
  
  return (
    <>
       <MainComp />
    </>
  )
}

export default App;