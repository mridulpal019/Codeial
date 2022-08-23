import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';

const FriendsList = () => {
  const auth = useAuth();
  const { friends = {} } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>
        {friends && friends.length === 0 && (
          <div className={styles.noFriends}>No friends FOund!</div>
        )}
        {friends &&
          friends.map((friend) => (
            <div key={`friend=${friend._id}`}>
              <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
                <div className={styles.friendsImg}>
                  <img
                    src="https://i.pinimg.com/736x/25/78/61/25786134576ce0344893b33a051160b1.jpg"
                    alt="pp"
                  />
                </div>
                <div className={styles.friendsName}>
                  {friends.to_user ?.email} Friend
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;
