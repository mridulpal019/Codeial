import { useContext, useEffect, useState } from "react"
import { AuthContext,PostsContext } from "../providers";
import { editProfile, login as userLogin,register,fetchUserFriends,getPosts } from "../api";
import jwt from "jwt-decode"
import { setItemInLocalStorege ,LOCALSTORAGE_TOKEN_KEY, removeItemInLocalStorege, getItemInLocalStorege} from "../utils";
export const useAuth=()=>{
    return useContext(AuthContext)
}

export const useProvideAuth =()=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
     useEffect(() => {
       const getUser = async () => {
         const userToken = getItemInLocalStorege(LOCALSTORAGE_TOKEN_KEY);

         if (userToken) {
           const user = jwt(userToken);
           const response = await fetchUserFriends();

           let friends = [];

           if (response.success) {
             friends = response.data.friends;
           }

           setUser({
             ...user,
             friends,
           });
         }

         setLoading(false);
       };

       getUser();
     }, []);
    
    // useEffect(()=>{
    //     const userToken=getItemInLocalStorege(LOCALSTORAGE_TOKEN_KEY);
    //     if(userToken){
    //         const user=jwt(userToken);
    //         setUser(user);
    //         console.log(user,"user")
    //     }
     
    //     setLoading(false);
    // },[])
    const updateUser =async (userId,name,password,confirmPassword)=>{
      const response = await editProfile(
        userId,
        name,
        password,
        confirmPassword
      );
      console.log("response",response)
      setUser(response.data.user);
      if (response.success) {
        setUser(response.data.user);
        setItemInLocalStorege(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token ? response.data.token : null
        );
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    }
    const login =async (email,password)=>{
        const response=await userLogin(email,password);
        if(response.success){
          setUser(response.data.user);
          console.log(response.data.user,"data login");
          setItemInLocalStorege(LOCALSTORAGE_TOKEN_KEY,response.data.token ? response.data.token : null);
            return{
                success:true
            }
        }else{
            return{
                success:false,
                message:response.message
            }
        }
    };

    const signup = async (name, email, password, confirmPassword) => {
      const response = await register(name, email, password, confirmPassword);

      if (response.success) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    };
    const logout=()=>{
        setUser(null);
        removeItemInLocalStorege(LOCALSTORAGE_TOKEN_KEY)
    };
    const updateUserFriends=(addFriend,friend)=>{
      if (addFriend ===true){
        setUser({
          ...user,
          friends:[...user.friendships,friend],
        });
        return;
      };
      const newFriends=user.friends.filter(f=> f.to_user._id !==friend.to_user._id);
      setUser({
        ...user,
        friends:newFriends
      });
      return;
    }
   
    return {
        user,
        login,
        logout,
        loading,
        signup,
        updateUser,
        updateUserFriends
    }
};

export const usePost = () => {
  return useContext(PostsContext);
};
export const useProvidePosts =()=>{
    const [posts,setPosts]=useState(null);
    const [loading,setLoading]=useState(true);
      useEffect(() => {
        const fetchPosts = async () => {
          const response = await getPosts();
          console.log('res', response);
          if (response.success) {
            setPosts(response.data.posts);
          }
          setLoading(false);
        };
        fetchPosts();
      }, []);


      const addPostToState=(post)=>{
        const newPosts=[post,...posts];
        setPosts(newPosts);
      }

        const addComment = (comment, postId) => {
          const newPosts = posts.map((post) => {
            if (post._id === postId) {
              return { ...post, comments: [...post.comments, comment] };
            }
            return post;
          });

          setPosts(newPosts);
        };
    return {
      data:posts,
      loading,
      addPostToState,
      addComment
    }
  }
