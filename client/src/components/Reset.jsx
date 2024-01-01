import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePasswordResetMutation } from '../features/api/apiSlice';
import Header from './Header';
import Loading from './Loading';
import Success from './Success';
import Error from './Error';

const Reset = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [resetData, response] = usePasswordResetMutation();
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const resetHandler = () => {
    console.log(location?.search?.split('?')[1], 'llll');
    location &&
      resetData({
        password,
        confirmPassword,
        resetToken:location?.search?.split('?')[1],
      });
  };

  useEffect(() => {
    response?.status === 'pending' ? setPending(true) : setPending(false);
    response?.status === 'rejected'
      ? (setErrorMessage( 
          response?.error?.data?.msg
            ? response?.error?.data?.msg
            : [response?.error?.data?.message]
        ),
        setError(true))
      : null;
    response?.status === 'fulfilled'
      ? (setSuccessMessage(response?.data?.message),
        setError(false),
        setSuccess(true),
        setTimeout(() => {
          setSuccess(false);
        }, 3000),
        navigate('/login', { replace: true }))
      : null;
  }, [response]);

  return (
    <div className="flex w-full items-center mt-10 py-10 justify-center h-[100vh] bg-indigo-500 text-black">
      <Header />
      {error && errorMessage && (
        <Error
          errors={errorMessage}
          isSingle={response?.error?.data?.msg?false:true}
          setError={setError}
        />
      )}
      {success && successMessage && <Success message={successMessage} />}
      <div className="w-[40%] h-auto py-5 px-10 bg-indigo-700 flex gap-2 flex-col items-center justify-center rounded-lg border border-indigo-900">
        <p className="text-2xl font-bold text-white py-4 self-start">
          Reset password
        </p>
        <p className=" font-bold text-white mt-2 self-start">password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          className=" h-10 border border-indigo-900 w-[100%] px-2 rounded-md"
          placeholder="eg.gedion@gmail.com"
        />
        <p className=" font-bold text-white mt-2 self-start">
          confirm password
        </p>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="text"
          className=" h-10 border border-indigo-900 w-[100%] mb-4 px-2 rounded-md"
          placeholder="eg.gedion@gmail.com"
        />

        {response?.status === 'pending' ? (
          <div className="h-10 text-xl flex items-center justify-center border mt-5 w-[100%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200">
            <Loading />
          </div>
        ) : (
          <button
            onClick={resetHandler}
            className="h-10 text-xl border border-indigo-900 w-[100%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Reset;
