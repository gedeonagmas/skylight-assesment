import React, { useEffect, useState } from 'react';
import { useUserLoginMutation } from '../features/api/apiSlice';
import Loading from './Loading';
import { Link, useNavigate } from 'react-router-dom';
import Success from './Success';
import Error from './Error';
import Header from './Header';

const Login = () => {
  const [loginData, loginResponse] = useUserLoginMutation();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);

  const loginHandler = () => {
    loginData({ userName, password, method: 'local' });
  };

  useEffect(() => {
    if (loginResponse.status === 'rejected') {
      setSuccess(false);
      setError(true);
      if (loginResponse.error.data?.message !== undefined) {
        setErrorMessage(loginResponse.error.data.message);
      } else if (loginResponse.error.data?.message === undefined) {
        setErrorMessage('something went wrong please try again later');
      }
    } else if (loginResponse.status === 'fulfilled') {
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      window.localStorage.setItem('skylight-jwt', loginResponse.data.token);
      navigate('/dashboard', { state: { user: loginResponse?.data?.user } });
    } else if (loginResponse.status === 'pending') {
      setError(false);
      setSuccess(false);
    }
  }, [loginResponse]);

  return (
    <div className="flex w-full items-center mt-10 justify-center h-[100vh] bg-indigo-500 text-black">
      <Header />
      {error && errorMessage && (
        <Error errors={errorMessage} isSingle={true} setError={setError} />
      )}
      {success && successMessage && <Success message={successMessage} />}
      <div className="w-[40%] h-auto py-5 px-10 bg-indigo-700 flex gap-2 flex-col items-center justify-center rounded-lg border border-indigo-900">
        <p className="text-2xl font-bold text-white py-4 self-start">Login</p>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          className=" h-10 border border-indigo-900 w-[100%] px-2 rounded-md"
          placeholder="user name"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          className=" h-10 border border-indigo-900 w-[100%] px-2 rounded-md"
          placeholder="password"
        />
        {loginResponse?.status === 'pending' ? (
          <div className="h-10 text-xl flex items-center justify-center border w-[100%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200">
            <Loading />
          </div>
        ) : (
          <button
            onClick={loginHandler}
            className="h-10 text-xl border border-indigo-900 w-[100%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200"
          >
            Login
          </button>
        )}

        <div className="flex justify-between px-2 w-full items-center mt-5">
          <Link to="/forget" className="font-bold text-white self end cursor-pointer">
            forget password?
          </Link>
        </div>
      </div>
    </div> 
  );
};

export default Login;
