// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { useAuthStore } from '../stores/useAuthStore';
import styles from '../scss/LoginPage.module.scss';
import LoadingSpinner from '../components/LoadingSpinner';
import LogoImage from '../assets/Home/Logo_eddy.png';
import { toast } from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending, isError } = useLogin();
  const setIsAuthenticated = useAuthStore((state) => state.login);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    login(
      { username, password },
      {
        onSuccess: (data) => {
          setIsAuthenticated(data.token); // Almacena el token en el estado
          toast.success('Login successful');
          navigate('/dashboard');
        },
        onError: () => {
          setError('Invalid username or password');
          toast.error('Login failed');
        },
      }
    );
  };


  return (
    <div className={styles.container}>
    <div className={styles.card}>
      <img src={LogoImage} alt="Logo" />
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      {isError && <p className={styles.error}>Error logging in</p>}
      {isPending ? <LoadingSpinner /> : <button onClick={handleLogin} className={styles.button}>Login</button>}
    </div>
  </div>
  );
};

export default LoginPage;
