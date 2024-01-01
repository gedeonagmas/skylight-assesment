import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['get-all-users', 'get-history', 'get-employee', 'get-permission'],
  endpoints: (builder) => ({
    //user signup
    userRegister: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/user/signup',
        method: 'POST',
        body: data,
      }),
    }),
    //user login
    userLogin: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/user/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-all-users'],
    }),
    //user login
    getAllUsers: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/user/get/all/users',
        method: 'POST',
        body: data,
      }),
      providesTags: ['get-all-users'],
    }),

    addToMongodb: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:7000/add/data',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-all-users'],
    }),

    //chat
    chatGetAllUsers: builder.query({
      query: () => 'http://localhost:7000/get/all/users',
      providesTags: ['allUsers'],
    }),

    chatGetSingleUsers: builder.query({
      query: (data) =>
        `http://localhost:7000/get/single/users?userName=${data.userName}`,
      providesTags: ['allUsers'],
    }),

    chatGetAllGroups: builder.query({
      query: () => 'http://localhost:7000/get/group/data',
      providesTags: ['allGroups'],
    }),

    chatDeleteUsers: builder.mutation({
      query: (id) => ({
        url: `http://localhost:7000/delete/single/users?ids=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['allUsers'],
    }),

    chatDeleteMongoUsers: builder.mutation({
      query: (data) => ({
        url: `http://localhost:7000/delete/mongo/users?userName=${data.userName}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['allUsers'],
    }),

    chatDeleteGroups: builder.mutation({
      query: (id) => ({
        url: `http://localhost:7000/delete/groups?ids=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['allGroups'],
    }),

    chatCreateGroup: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:7000/post/group',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['allGroups'],
    }),

    getPrivateChat: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:7000/get/private/chat/special',
        method: 'POST',
        body: data,
      }),
    }),

    updateUserData: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/user/update/data',
        method: 'PUT',
        body: data,
        headers: {
          authorization: localStorage.getItem('skylight-jwt'),
        },
      }),
      invalidatesTags: ['get-employee'],
    }),

    getAllEmployee: builder.query({
      query: () => ({
        url: 'http://localhost:5000/user/getAllEmployee',
        method: 'GET',
        headers: {
          authorization: localStorage.getItem('skylight-jwt'),
        },
      }),
      providesTags: ['get-employee'],
    }),

    deleteEmployee: builder.mutation({
      query: (data) => ({
        url: `http://localhost:5000/user/delete/employee?id=${data.id}`,
        method: 'DELETE',
        headers: {
          authorization: localStorage.getItem('skylight-jwt'),
        },
      }),
      invalidatesTags: ['get-employee'],
    }),

    getPermission: builder.query({
      query: (data) => ({
        url: `http://localhost:5000/user/getPermission?id=${data.id}`,
        method: 'GET',
        headers: {
          authorization: localStorage.getItem('skylight-jwt'),
        },
      }),
      provideTags: ['get-permission'],
    }),

    updatePermission: builder.mutation({
      query: (data) => ({
        url: `http://localhost:5000/user/updatePermission?id=${data.id}`,
        method: 'PUT',
        headers: {
          authorization: localStorage.getItem('skylight-jwt'),
        },
        body: data,
      }),
      invalidatesTagsTags: ['get-permission'],
    }),

    passwordReset: builder.mutation({
      query: (data) => ({
        url: `http://localhost:5000/user/reset?resetToken=${data.resetToken}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-employee'],
    }),

    passwordForget: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/user/forget',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-employee'],
    }),

    registerTest: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:3000/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetAllUsersMutation,
  useChatGetAllUsersQuery,
  useChatCreateGroupMutation,
  useChatDeleteGroupsMutation,
  useChatDeleteUsersMutation,
  useChatGetAllGroupsQuery,
  useGetPrivateChatMutation,
  useGetAllEmployeeQuery,
  useUpdateUserDataMutation,
  useDeleteEmployeeMutation,
  useGetPermissionQuery,
  useUpdatePermissionMutation,
  useAddToMongodbMutation,
  useChatGetSingleUsersQuery,
  useChatDeleteMongoUsersMutation,
  usePasswordForgetMutation,
  usePasswordResetMutation,
  useRegisterTestMutation
} = apiSlice;
