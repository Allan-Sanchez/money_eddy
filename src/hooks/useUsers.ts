import { useMutation, useQuery, QueryKey, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';
import { UsersResponse } from '../types/Users';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fetchUsers = async (): Promise<UsersResponse[]> => {
  const { data } = await axiosInstance.get(`${backendUrl}/api/users`);
  return data;
};

const fetchUserById = async (id: number): Promise<UsersResponse> => {
  const { data } = await axiosInstance.get(`${backendUrl}/api/users/${id}`);
  return data;
};

const createUser = async (user: Omit<UsersResponse, 'id'>): Promise<UsersResponse> => {
  const { data } = await axiosInstance.post(`${backendUrl}/api/users`, user);
  return data;
};

const updateUser = async ({ id, user }: { id: number; user: Omit<UsersResponse, 'id'> }): Promise<UsersResponse> => {
  const { data } = await axiosInstance.put(`${backendUrl}/api/users/${id}`, user);
  return data;
};

const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${backendUrl}/api/users/${id}`);
};

export const useUsers = () => {
  const queryKey: QueryKey = ['users'];
  return useQuery({
    queryKey,
    queryFn: fetchUsers,
  });
};

export const useUser = (id: number) => {
  const queryKey: QueryKey = ['user', id];
  return useQuery({
    queryKey,
    queryFn: () => fetchUserById(id),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
