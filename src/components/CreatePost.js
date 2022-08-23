import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePost } from '../hooks';
const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const {addToast}=useToasts();
  const posts =usePost();

  const handleAddPostClick = async() => {
    setAddingPost(true);
    //do some checks
    const response =await addPost(post);
    
    if(response.success){
      setPost('');
      posts.addPostToState(response.data.post)
      addToast('Post created successfully',{
         apperance:"success"
      }
      )
    }else{
       addToast(response.message, {
         apperance: 'error',
       });
    }
    setAddingPost(false);

  };
  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        onChange={(e) => {
          setPost(e.target.value);
        }}
        value={post}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Post' : 'Add Post'}
        </button>
      </div>
    </div>
  );


};

export default CreatePost;
