import {useEffect} from 'react';
import {getPosts} from "../api/index";

function App() {

  useEffect(()=>{
    const fetchPosts=async()=>{
            const response = await  getPosts();
            console.log("res",response)
    }
    fetchPosts()

  },[]);
  return (
    <>
    <h1>hi!</h1></>
  );
}

export default App;
