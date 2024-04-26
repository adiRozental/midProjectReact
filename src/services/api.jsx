// src/services/api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
};

export const fetchPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  return data;
};

export const fetchTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  const data = await response.json();
  return data;
};

export const markTodoCompleted = async (todoId) => {
  await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed: true }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
