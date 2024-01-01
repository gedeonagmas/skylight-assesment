import { Book, Create, Delete, Edit, Update } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import Loading from './Loading';
import {
  useChatDeleteMongoUsersMutation,
  useChatGetSingleUsersQuery,
  useDeleteEmployeeMutation,
  useGetAllEmployeeQuery,
  useGetPermissionQuery,
  useUpdatePermissionMutation,
  useUpdateUserDataMutation,
} from '../features/api/apiSlice';
import Success from './Success';
import Error from './Error';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Signup from './Signup';

const Dashboard = () => {
  const [updateData, updateResponse] = useUpdateUserDataMutation();
  const { data: employeeData } = useGetAllEmployeeQuery();

  const [deleteData, deleteResponse] = useDeleteEmployeeMutation();
  const [deleteMongoData, deleteMongoResponse] =
    useChatDeleteMongoUsersMutation();
  let response = {};
  const location = useLocation();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const user = location.state.user;
  const { data: permissionData } = useGetPermissionQuery({ id: user.id });
  const [permissionUpdateData, permissionUpdateResponse] =
    useUpdatePermissionMutation();
  const { data: currentUser } = useChatGetSingleUsersQuery({
    userName: user?.userName,
  });
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const [deletedUser, setDeletedUser] = useState('');

  const [permission, setPermission] = useState(false);
  const [read, setRead] = useState();
  const [update, setUpdate] = useState();
  const [deletePer, setDeletePer] = useState();
  const [create, setCreate] = useState();
  const [description, setDescription] = useState('');

  const [overview, setOverview] = useState(true);
  const [createScreen, setCreateScreen] = useState(false);
  const [permissionScreen, setPermissionScreen] = useState(false);
  const [profileScreen, setProfileScreen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [deletedUserName, setDeletedUserName] = useState();

  const updateHandler = (id) => {
    updateData({
      id: editData.id.toString(),
      fullName,
      email,
      userName,
      phone,
      salary,
      position,
    });
  };
  const deleteHandler = () => {
    deletedUserName && setDeletedUser(deletedUserName);
    deletedId && deleteData({ id:deletedId });
  };

  useEffect(() => {
    if (deleteResponse) {
      response = { ...deleteResponse };
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (deleteResponse.status === 'fulfilled' && deletedUser) {
      deleteMongoData({ userName: deletedUser });
    }
  }, [deletedUser, deleteResponse]);

  useEffect(() => {
    if (updateResponse) {
      response = { ...updateResponse };
    }
  }, [updateResponse]);

  useEffect(() => {
    if (permissionUpdateResponse) {
      response = { ...permissionUpdateResponse };
    }
  }, [permissionUpdateResponse]);

  useEffect(() => {
    if (response.status === 'rejected') {
      setSuccess(false);
      setError(true);
      if (response?.error?.data?.message) {
        setErrorMessage(response?.error?.data?.message);
      }
    } else if (response.status === 'fulfilled') {
      setError(false);
      setSuccess(true);
      setPopup(false);
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else if (response.status === 'pending') {
      setError(false);
      setSuccess(false);
    }
  }, [response]);

  useEffect(() => {
    setFullName(editData?.fullName);
    setEmail(editData?.email);
    setUserName(editData?.userName);
    setPhone(editData?.phone);
    setSalary(editData?.salary);
    setPosition(editData?.position);
  }, [editData]);

  useEffect(() => {
    if (permissionData) {
      setRead(permissionData[0]?.read);
      setUpdate(permissionData[0]?.update);
      setDeletePer(permissionData[0]?.deletePer);
      setCreate(permissionData[0]?.create);
    }
  }, [permissionData]);

  const askHandler = () => {
    permissionUpdateData({
      id: user.id,
      askedPermissions: `${read === 1 ? 'read' : ''}#${
        update === 1 ? 'update' : ''
      }#${deletePer === 1 ? 'delete' : ''}#${create === 1 ? 'create' : ''}`,
      type: 'request',
      description,
    });
  };

  const grantedHandler = () => {
    permissionUpdateData({
      id: permissionData[0].adminId,
      read,
      update,
      deletePer,
      create,
      type: 'grant',
    });
  };

  return (
    <div className="items-start justify-start flex h-[100vh] w-full bg-white text-black">
      {error && errorMessage && (
        <Error errors={errorMessage} isSingle={true} setError={setError} />
      )}
      {success && successMessage && <Success message={successMessage} />}
      <Sidebar
        setOverview={setOverview}
        setCreateScreen={setCreateScreen}
        setPermissionScreen={setPermissionScreen}
        setProfileScreen={setProfileScreen}
        currentUser={currentUser}
        user={user}
        setEditData={setEditData}
      />
      <div className="w-full flex relative justify-between py-2 h-auto flex-col">
        <NavBar user={user} totalEmployee={employeeData?.length}/>
        {profileScreen && editData && (
          <div className="w-full h-auto bg-white mt-14 text-sm flex px-2 py-4 flex-col  ">
            <p className="border-b border-indigo-400 w-[200px] py-1">
              Profile information
            </p>
            <div className="flex flex-col w-[100%] items-start mt-4 justify-start">
              <p className="self-start">Full name</p>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="full name"
                type="text"
                className="py-1 px-2 w-[30%] focus:outline-gray-300 rounded-sm border border-gray-300"
              />
            </div>
            <div className="flex flex-col w-[100%] items-start mt-4 justify-start">
              <p className="self-start">User name</p>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="user name"
                type="text"
                className="py-1 px-2 w-[30%] focus:outline-gray-300 rounded-sm border border-gray-300"
              />
            </div>
            <div className="flex flex-col w-[100%] items-start mt-4 justify-start">
              <p className="self-start">Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                type="text"
                className="py-1 px-2 w-[30%] focus:outline-gray-300 rounded-sm border border-gray-300"
              />
            </div>
            <div className="flex flex-col w-[100%] items-start mt-4 justify-start">
              <p className="self-start">Phone</p>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone"
                type="text"
                className="py-1 px-2 w-[30%] focus:outline-gray-300 rounded-sm border border-gray-300"
              />
            </div>
            <div className="flex flex-col w-[100%] items-start mt-4 justify-start">
              <p className="self-start">Position</p>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="position"
                type="text"
                className="py-1 px-2 w-[30%] focus:outline-gray-300 rounded-sm border border-gray-300"
              />
            </div>
            <div className="flex flex-col w-[100%] items-start mt-4 justify-start">
              <p className="self-start">Salary</p>
              <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="salary"
                type="text"
                className="py-1 px-2 w-[30%] focus:outline-gray-300 rounded-sm border border-gray-300"
              />
            </div>
            {updateResponse?.status === 'pending' ? (
              <div className="h-10 text-xl flex items-center mt-3 justify-center border w-[30%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200">
                <Loading />
              </div>
            ) : (
              <button
                onClick={updateHandler}
                className="h-10 text-xl border mt-3 border-indigo-900 w-[30%] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200"
              >
                update
              </button>
            )}
          </div>
        )}
        {popup && (
          <div className="absolute shadow-lg shadow-gray-400 top-[40%] left-[40%] z-20 w-auto h-auto py-4 px-5 rounded-md border border-gray-400 bg-white flex flex-col gap-2">
            <p className="mt-3">Are you sure, this action is irreversible!</p>
            <div
              onClick={() => setPopup(false)}
              className="absolute top-1 right-1 hover:text-gray-500 text-gray-400"
            >
              <Close />
            </div>
            <div className="flex mt-4 gap-5 justify-between">
              <button
                onClick={() => setPopup(false)}
                className="bg-gray-200 text-black rounded-md py-1 px-3 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={deleteHandler}
                className="bg-red-400 text-white rounded-md py-1 px-3 hover:bg-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {overview && (
          <div className="w-full h-auto bg-white mt-14 text-sm relative ">
            <table className="w-full  max-h-[100vh] border border-gray-300">
              <thead className={``}>
                <tr className="border-t border-b border-gray-300 bg-gray-100">
                  <td className="px-1 text-center  py-1">No.</td>
                  <td className="px-1 text-center">Profile</td>
                  <td className="px-1 text-center">Full Name</td>
                  <td className="px-1 text-center ">User Name</td>
                  <td className="px-1 text-center">Email</td>
                  <td className="px-1 text-center">Phone</td>
                  <td className="px-1 text-center">Salary</td>
                  <td className="px-1 text-center">Position</td>
                  <td className="px-1 text-center">Role</td>
                  <td className="px-1 text-center">Actions</td>
                </tr>
              </thead>
              {employeeData && employeeData.length > 0 ? (
                employeeData
                  .filter((e) => e.id !== user.id && e.role !== 'superAdmin')
                  .map((d, i) => {
                    return (
                      <tbody key={d._id} className="py-1">
                        <tr className="py-1 border border-gray-300 text-center ">
                          <td className="px-1 text-center">{i + 1}</td>
                          <td className="px-1 text-center">
                            <img
                              src={`http://localhost:5000/uploads/${d.profilePicture}`}
                              alt="profile"
                              className="w-10 my-[2px] mx-[2px] h-10 border rounded-full"
                            />
                          </td>
                          <td className="px-1 text-center">{d.fullName}</td>
                          <td className="px-1 text-center">{d.userName}</td>
                          <td className="px-1 text-center">{d.email}</td>
                          <td className="px-1 text-center">{d.phone}</td>{' '}
                          <td className="px-1 text-center">{d.salary}</td>
                          <td className="px-1 text-center">{d.position}</td>
                          <td className="px-1 text-center">{d.role}</td>
                          <td className="px-1 py-1 flex items-center text-center justify-end gap-3">
                            <div
                              onClick={() => {
                                setEditData(d);
                                setProfileScreen(true);
                              }}
                              className="border flex gap-4 py-1 px-2 cursor-pointer hover:bg-gray-200 items-center justify-center rounded-md"
                            >
                              <Edit fontSize="small" /> Edit
                            </div>{' '}
                            <div
                              onClick={() => {
                                setDeletedId(d.id);
                                setDeletedUserName(d.userName);
                                setPopup(true);
                              }}
                              className="border flex gap-2 py-1 px-2 cursor-pointer hover:bg-[#ff0336] hover:text-white items-center justify-center rounded-md"
                            >
                              <Delete fontSize="small" /> Delete
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
              ) : (
                <tbody className="py-1">
                  <tr className="pl-2 py-1 mt-40 border border-l-0 -0">
                    <td className="px-1 border border-gray-400">
                      There is no data to display
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        )}

        {createScreen && (
          <div className="w-full h-auto bg-white mt-14 text-sm relative flex flex-col items-start px-5 py-2 justify-center">
            <Signup type="admin" />
          </div>
        )}
        {permissionScreen && permissionData && (
          <div className="w-full h-auto bg-white mt-14 text-sm relative flex flex-col items-start px-5 py-2 justify-center">
            {user.role === 'admin' ? (
              <div className="w-auto">
                <p className="text-gray-500 font-bold text-sm py-1 border-b border-indigo-400">
                  Available permissions
                </p>
                <div className="flex mt-2 gap-2">
                  <p className="">
                    {permissionData[0]?.read === 1 ? (
                      <div className="flex items-center w-24 bg-emerald-400 text-white justify-start gap-3 border border-gray-200 rounded-md p-2">
                        <Book fontSize="small" />
                        <p className="uppercase">Read</p>
                      </div>
                    ) : null}
                  </p>
                  <p className="">
                    {permissionData[0]?.update === 1 ? (
                      <div className="flex items-center w-24 bg-blue-400 text-white justify-start gap-3 border border-gray-200 rounded-md p-2">
                        <Update fontSize="small" />
                        <p className="uppercase">Update</p>
                      </div>
                    ) : null}
                  </p>
                  <p className="">
                    {permissionData[0]?.create === 1 ? (
                      <div className="flex items-center w-24 bg-yellow-400 text-white justify-start gap-3 border border-gray-200 rounded-md p-2">
                        <Create fontSize="small" />
                        <p className="uppercase">Create</p>
                      </div>
                    ) : null}
                  </p>
                  <p className="">
                    {permissionData[0]?.deletePer === 1 ? (
                      <div className="flex items-center w-24 bg-red-400 text-white justify-start gap-3 border border-gray-200 rounded-md p-2">
                        <Delete fontSize="small" />
                        <p className="uppercase">Delete</p>
                      </div>
                    ) : null}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-auto">
                <p className="text-gray-500 font-bold text-sm py-1 border-b border-indigo-400">
                  Requested permissions
                </p>
                <div className="flex text-gray-600 text-sm mt-3 gap-4">
                  {permissionData[0]?.askedPermissions?.split('#').map((e) => {
                    if (e === 'read') {
                      return (
                        <div className="flex items-center w-24 bg-emerald-400 text-white justify-start gap-3 border border-gray-200 rounded-md p-2">
                          <Book fontSize="small" />
                          <p className="uppercase">{e}</p>
                        </div>
                      );
                    } else if (e === 'update') {
                      return (
                        <div className="flex items-center w-24 bg-blue-400 text-white justify-start gap-3 border border-gray-200 rounded-md p-2">
                          <Update fontSize="small" />
                          <p className="uppercase">{e}</p>
                        </div>
                      );
                    } else if (e === 'create') {
                      return (
                        <div className="flex items-center w-24 bg-yellow-400 text-white justify-start gap-3 border border-gray-200 rounded-md p-2">
                          <Create fontSize="small" />
                          <p className="uppercase">{e}</p>
                        </div>
                      );
                    } else if (e === 'delete') {
                      return (
                        <div className="flex items-center w-24 bg-red-400 text-white justify-start gap-3 border border-gray-200 rounded-md p-2">
                          <Delete fontSize="small" />
                          <p className="uppercase">{e}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}

            <div className="flex mt-4 w-auto max-w-[600px] flex-col">
              <p className="font-bold border-b border-indigo-400 py-1">
                Description
              </p>{' '}
              {user.role === 'superAdmin' ? (
                <p className="mt-1">{permissionData[0].description}</p>
              ) : (
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  name=""
                  id=""
                  cols="50"
                  placeholder="your reason"
                  rows="3"
                  required
                  className="border border-gray-300 focus:outline-none rounded-lg mt-4 p-2"
                ></textarea>
              )}
            </div>

            <div
              onClick={() => setRead(read === 1 ? 0 : 1)}
              className="flex mt-4 cursor-pointer border hover:bg-gray-200 border-gray-300 rounded-md items-center justify-between text-sm w-[200px] py-2 px-3 gap-4"
            >
              <input
                value={read}
                type="checkbox"
                name="read"
                checked={read === 1 ? true : false}
                id=""
                onChange={(e) => {
                  setRead(read === 1 ? 0 : 1);
                }}
                className="w-6 h-6"
              />
              <div className="flex items-center text-emerald-500 justify-center gap-2">
                <Book fontSize="small" />
                <p className="uppercase font-bold">Read</p>
              </div>
            </div>

            <div
              onClick={() => setUpdate(update === 1 ? 0 : 1)}
              className="flex mt-4 cursor-pointer border hover:bg-gray-200 border-gray-300 rounded-md items-center justify-between text-sm w-[200px] py-2 px-3 gap-4"
            >
              <input
                value={update}
                type="checkbox"
                checked={update === 1 ? true : false}
                name="read"
                id=""
                onChange={(e) => {
                  setUpdate(update === 1 ? 0 : 1);
                }}
                className="w-6 h-6"
              />
              <div className="flex items-center text-blue-500 justify-center gap-2">
                <Update fontSize="small" />
                <p className="uppercase font-bold">Update</p>
              </div>
            </div>

            <div
              onClick={() => setDeletePer(deletePer === 1 ? 0 : 1)}
              className="flex mt-4 cursor-pointer border hover:bg-gray-200 border-gray-300 rounded-md items-center justify-between text-sm w-[200px] py-2 px-3 gap-4"
            >
              <input
                value={deletePer}
                type="checkbox"
                checked={deletePer === 1 ? true : false}
                name="read"
                id=""
                onChange={(e) => {
                  setDeletePer(deletePer === 1 ? 0 : 1);
                }}
                className="w-6 h-6"
              />
              <div className="flex items-center text-red-500 justify-center gap-2">
                <Delete fontSize="small" />
                <p className="uppercase font-bold">Delete</p>
              </div>
            </div>

            <div
              onClick={() => setCreate(create === 1 ? 0 : 1)}
              className="flex mt-4 cursor-pointer border hover:bg-gray-200 border-gray-300 rounded-md items-center justify-between text-sm w-[200px] py-2 px-3 gap-4"
            >
              <input
                value={create}
                type="checkbox"
                checked={create === 1 ? true : false}
                name="read"
                id=""
                onChange={(e) => {
                  setCreate(create === 1 ? 0 : 1);
                }}
                className="w-6 h-6"
              />
              <div className="flex items-center text-blue-500 justify-center gap-2">
                <Create fontSize="small" />
                <p className="uppercase font-bold">Create</p>
              </div>
            </div>

            <button
              onClick={user.role === 'superAdmin' ? grantedHandler : askHandler}
              className="h-10 text-xl mt-2 border border-indigo-900 w-[200px] px-2 rounded-md text-white bg-indigo-500 hover:text-gray-200"
            >
              {user.role === 'superAdmin' ? 'Grant' : 'Ask'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
