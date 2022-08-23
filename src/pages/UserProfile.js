import { useParams, useNavigate, Navigate } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';
const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
   const [requestProgress, setRequestProgress] = useState(false);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const auth = useAuth();
  console.log(auth,"user auth")
  //   const navigate=useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });

        return <Navigate to="/" />;
      }
      setLoading(false);
    };
    getUser();
  }, [userId, addToast]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };
  const showAddFriendBtn = checkIfUserIsAFriend();

  //   console.log(location.state, 'll');
  //   const { user = {} } = location.state;


  const handleRemoveFriendClick=async ()=>{
      setRequestProgress(true);
               
            const response=await removeFriend(userId);
            if(response.success){
                const friendship=auth.user.friends.filter((friend)=> friend.to_user._id ===userId)
                auth.updateUserFriends(false,friendship[0]);
                addToast('Friend Removed  Successfully',{
                    appearance:"success"
                })

            }else{
                addToast(response.message,{
                    appearance:'error'
                })
            }



            setRequestProgress(false);

  }
   const handleAddFriendClick =async () => {
            setRequestProgress(true);
               
            const response=await addFriend(userId);
            if(response.success){
                const {friendship}=response.data;
                auth.updateUserFriends(true,friendship);
                addToast('Friend added Successfully',{
                    appearance:"success"
                })

            }else{
                addToast(response.message,{
                    appearance:'error'
                })
            }



            setRequestProgress(false);
   };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="" alt="propfile pic" />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>
      <div className={styles.btnGrp}>
        {showAddFriendBtn ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestProgress}
          >
            {requestProgress ? 'Removing friend...' : ' Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestProgress}
          >
            {requestProgress ? 'Adding friend...' : ' Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
