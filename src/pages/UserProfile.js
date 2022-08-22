import { useLocation } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react';
const UserProfile = () => {
  const location = useLocation();
  console.log(location.state, 'll');
  const { user = {} } = location.state;

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
        <button
          className={`button ${styles.saveBtn}`}
          //   onClick={() => setEditMode(true)}
        >
          Add Friend
        </button>

        <button
          className={`button ${styles.saveBtn}`}
          //   onClick={() => setEditMode(true)}
        >
          Remove Friend
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
