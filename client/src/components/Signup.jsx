import React from 'react';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import {
  useAddToMongodbMutation,
  useUserRegisterMutation,
} from '../features/api/apiSlice';
import { Image } from '@mui/icons-material';
import Error from './Error';
import Success from './Success';
import Header from './Header';

const Signup = () => {
  const [signupData, signupResponse] = useUserRegisterMutation();
  const [mongoData, mongoResponse] = useAddToMongodbMutation();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const signupHandler = () => {
    const form = new FormData();
    form.append('fullName', fullName);
    form.append('email', email);
    form.append('userName', userName);
    form.append('phone', phone);
    form.append('salary', salary);
    form.append('position', position);
    form.append('password', password);
    form.append('confirmPassword', confirmPassword);
    form.append('profilePicture', profilePicture);
    form.append('role', 'user');
    mongoData(form);
    signupData(form);
  };

  useEffect(() => {
    if (signupResponse.status === 'rejected') {
      setSuccess(false);
      setError(true);
      if (signupResponse.error.data?.msg !== undefined) {
        setErrorMessage(signupResponse.error.data.msg);
      } else if (signupResponse.error.data?.msg === undefined) {
        setErrorMessage(['something went wrong please try again later']);
      }
    } else if (signupResponse.status === 'fulfilled') {
      setError(false);
      setSuccess(true);
      setSuccessMessage(signupResponse.data.message);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else if (signupResponse.status === 'pending') {
      setError(false);
      setSuccess(false);
    }
  }, [signupResponse]);

  return (
    <div className="flex w-full items-center mt-10 py-10 justify-center h-[100vh] bg-indigo-500 text-black">
      <Header /> 
      {error && errorMessage && (
        <Error errors={errorMessage} isSingle={false} setError={setError} />
      )}
      {success && successMessage && <Success message={successMessage} />}
      <div className="w-[40%] h-auto py-2 pb-10 px-10 bg-indigo-700 flex gap-2 flex-col items-center justify-center rounded-lg border border-indigo-900">
        <p className="text-2xl font-bold text-white py-4 self-start">Sign up</p>
        <div className="flex w-full gap-2 justify-between items-center">
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className=" h-10 border border-indigo-900 w-[50%] px-2 rounded-md"
            placeholder="full name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className=" h-10 border border-indigo-900 w-[50%] px-2 rounded-md"
            placeholder="email"
          />
        </div>
        <div className="flex w-full gap-2 justify-between items-center">
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            className=" h-10 border border-indigo-900 w-[50%] px-2 rounded-md"
            placeholder="userName"
          />{' '}
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className=" h-10 border border-indigo-900 w-[50%] px-2 rounded-md"
            placeholder="phone"
          />
        </div>
        <div className="flex w-full gap-2 justify-between items-center">
          <input
            onChange={(e) => setPosition(e.target.value)}
            type="text"
            className=" h-10 border border-indigo-900 w-[50%] px-2 rounded-md"
            placeholder="position"
          />{' '}
          <input
            onChange={(e) => setSalary(e.target.value)}
            type="text"
            className=" h-10 border border-indigo-900 w-[50%] px-2 rounded-md"
            placeholder="salary"
          />
        </div>
        <div className="flex w-full gap-2 justify-between items-center">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className=" h-10 border border-indigo-900 w-[50%] px-2 rounded-md"
            placeholder="password"
          />{' '}
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="text"
            className=" h-10 border border-indigo-900 w-[50%] px-2 rounded-md"
            placeholder="confirm password"
          />
        </div>
        <div className="flex relative  w-full gap-2 justify-between items-center">
          <input
            onChange={(e) => setProfilePicture(e.target.files[0])}
            type="file"
            className="h-10 opacity-0 absolute bottom-0 left-0 z-20 border w-[50%] px-2 rounded-md"
            placeholder="profile picture"
          />
          <p className="h-10 z-0 border py-2 w-[100%] text-xs text-black bg-white opacity-100 px-2 rounded-md">
            <Image className="text-indigo-700" /> profile picture {'('} optional{' '}
            {')'}
          </p>{' '}
          {signupResponse?.status === 'pending' ? (
            <div className="h-10 text-xl flex items-center justify-center border w-[100%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200">
              <Loading />
            </div>
          ) : (
            <button
              onClick={signupHandler}
              className="h-10 text-xl border border-indigo-900 w-[100%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200"
            >
              Sign up
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Signup;
