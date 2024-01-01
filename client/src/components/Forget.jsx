import React, { useEffect, useState } from 'react';
import { Email } from '@mui/icons-material';
import Error from './Error';
import Success from './Success';
import { usePasswordForgetMutation } from '../features/api/apiSlice';
import Loading from './Loading';
import Header from './Header';

const Forget = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);
  const [forgetData, response] = usePasswordForgetMutation();
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const forgetHandler = () => {
    forgetData({ email });
  };

  useEffect(() => {
    response?.status === 'pending' ? setPending(true) : setPending(false);
    response?.status === 'rejected'
      ? (setErrorMessage(response?.error?.data?.message), setError(true))
      : null;
    response?.status === 'fulfilled'
      ? (setSuccessMessage(response?.data?.message),
        setError(false),
        setSuccess(true),
        setTimeout(() => {
          setSuccess(false);
        }, 8000))
      : null;
  }, [response]);

  return (
    <div className="flex w-full items-center mt-10 py-10 justify-center h-[100vh] bg-indigo-500 text-black">
      <Header />
      {error && errorMessage && (
        <Error errors={errorMessage} isSingle={true} setError={setError} />
      )}
      {success && successMessage && <Success message={successMessage} />}
      <div className="w-[40%] h-auto py-5 px-10 bg-indigo-700 flex gap-2 flex-col items-center justify-center rounded-lg border border-indigo-900">
        <p className="text-2xl font-bold text-white py-4 self-start">
          Forget password
        </p>
        <p className=" font-bold text-white mt-2 self-start">Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className=" h-10 border border-indigo-900 w-[100%] px-2 rounded-md"
          placeholder="eg.gedion@gmail.com"
        />

        {response?.status === 'pending' ? (
          <div className="h-10 text-xl flex items-center justify-center border mt-5 w-[100%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200">
            <Loading />
          </div>
        ) : (
          <button
            onClick={forgetHandler}
            className="h-10 text-xl border border-indigo-900 w-[100%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200"
          >
            Forget
          </button>
        )}
      </div>
    </div>
  );
};

export default Forget;
