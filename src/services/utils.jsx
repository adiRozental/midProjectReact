// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const markTodoCompleted = async (todoId) => {
  try {
    await axios.patch(`${BASE_URL}/todos/${todoId}`, { completed: true });
    console.log('Todo marked as completed successfully');
  } catch (error) {
    console.error('Error marking todo as completed:', error);
    throw error;
  }
};

export const updateUser = async (userId, updatedUserData) => {
  try {
    await axios.patch(`${BASE_URL}/users/${userId}`, updatedUserData);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const addPost = async (postData) => {
  try {
    await axios.post(`${BASE_URL}/posts`, postData);
    console.log('Post added successfully');
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};

export const addTodo = async (todoData) => {
  try {
    await axios.post(`${BASE_URL}/todos`, todoData);
    console.log('Todo added successfully');
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    await axios.post(`${BASE_URL}/users`, userData);
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};