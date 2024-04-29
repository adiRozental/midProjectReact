import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function PostList ({ posts, userId, onAddPost }) {
  const [showAddPostForm, setshowAddPostForm] = useState(false); 
  const [newPost, setNewPost] = useState(); 
  const [newBody, setNewBody] = useState(); 

  const handleAddPostClick = () => {
    setshowAddPostForm(true); 
  };

  const handleAddPost = () => {
    setshowAddPostForm(false); 
    const post = { id: posts.length+100, userId: userId ,title: newPost, body: newBody };
    onAddPost(post);
    setNewPost("");
    setNewBody("");

  };

  return (
    <div style={{ 
      margin: '10px'
    }}>    
      {!showAddPostForm && (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{flex: 3, padding: '10px'}}>
              <h3>Post List - User {userId} :</h3>
            </div>
          
            <div style={{flex: 1, padding: '20px'}}>
              <button  onClick={handleAddPostClick}>Add Post</button>
            </div>  
        </div>  
        <div style={{ border: '2px solid black',  borderRadius: '40px', padding: '20px', paddingRight:'0px'} }>
            {posts.map(post => (
                <Post post={post} />
            ))}
        </div>
        </div>
          )}
      {showAddPostForm && (
        <div style={{ flex: 1, paddingLeft: '5px'}}>
          <h3>New Post - User {userId} :</h3>

          <div style={{ border: '2px solid black', padding: '10px', borderRadius: '10px'}}>
            <div style={{ marginBottom: '5px' }}> {/* Added marginBottom */}
              Post: 
              <input 
                type="text" 
                placeholder="Post" 
                value={newPost} 
                onChange={(e) => setNewPost(e.target.value)} 
              /> <br />
              Bosy: 
              <input 
                type="text" 
                placeholder="Body" 
                value={newBody} 
                onChange={(e) => setNewBody(e.target.value)} 
              />
            </div>
            
            <div style={{ marginLeft: '10px' }}>
              <button style={{ marginRight: '10px' }} onClick={handleAddPost}>Add</button>
              <button onClick={() => setshowAddPostForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
        
        )}
      
    </div>
  );
};


