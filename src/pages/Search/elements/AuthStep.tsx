import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const AuthStep = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h2 className='text-lg font-semibold mb-4'>Авторизация</h2>

      <input
        className='w-full mb-2 p-3 border rounded'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type='password'
        className='w-full mb-4 p-3 border rounded'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={() => login(username, password)}
        className='w-full bg-[#4EBC73] rounded-xl text-white py-3'
      >
        Войти
      </button>
    </>
  );
};

export default AuthStep;
