import { useState } from 'react';
import styles from '../styles/login.module.css';
import {useToasts } from "react-toast-notifications";
import { useAuth } from '../hooks';

const Login = () => {
    const { addToast } = useToasts();
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const auth=useAuth();
    console.log(auth)

    const handleSubmit =async(e)=>{
        e.preventDefault();
        setLoggingIn(true);

        if(!email || !password){
               return addToast("Please enter both email and password",{
                apperance :"error"
               })
        }

          const response = await auth.login(email, password);
        if (response.success){
              addToast('Succesfully Logged In', {
                apperance: 'succes',
              });
        }else{
             addToast(response.message, {
               apperance: 'error',
             });
        }
          setLoggingIn(false);
    }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </form>
  );
};

export default Login;
