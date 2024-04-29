// src/components/Todo.jsx #c6def1
import React from 'react';

export default function Post({ post })
{
  return (
    <div style={{ 
        border:  '2px solid pink',  //##9ea1d4
        padding: '10px', 
        marginRight: '20px', marginTop: '10px' , borderRadius: '10px'
      }} >        
        <label style={{ marginRight: '10px' }}><u>Title:</u> </label> <span>{post.title}</span><br />
        <label style={{ marginRight: '10px' }}><u>Body:</u> </label> <span>{post.body}</span>
        
    </div>
  );
};

