import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react';
const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name,setName]=useState(auth.user?.email ? auth.user.name :"");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const {addToast} =useToasts();

  const clearForm=()=>{
    setPassword('');
    setConfirmPassword('');
}
  
  const updateProfile=async (e)=>{
      e.preventDefault();
      setSavingForm(true);
    
      let error =false;

      if(!name || !password || !confirmPassword){
        addToast("please Fill all The fields",{
            appreance:"error"
        });
        error=true;
      }

      if (password !== confirmPassword){
         addToast(' password and Confirm password doesnot match', {
           appreance: 'error',
         });
         error = true;

      }

      if(error){
        return setSavingForm(false);
      }   
      const response=await auth.updateUser(auth.user._id,name,password,confirmPassword);

      if (response.success){
        setEditMode(false);
        setSavingForm(false);
        clearForm();
        return addToast('User updated succesfully',{
            appearance:'success'
        })
      }else{
         addToast(response.message, {
          appearance: 'error',
        });
      }
      setSavingForm(false)

  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="" alt="propfile pic" />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>
      {!editMode ? (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            <div className={styles.fieldValue}>{auth.user?.name}</div>
          </div>
          <div className={styles.btnGrp}>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </div>
          <div className={styles.btnGrp}>
            <button
              className={`button ${styles.editBtn}`}
                onClick={updateProfile}
                disabled={savingForm}
            >
             {savingForm ? "Saving Changes..." : "Save Changes"}
            </button>
            
          </div>
          <div className={styles.btnGrp}>
            <button
              className={`button ${styles.editBtn}`}
                onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
