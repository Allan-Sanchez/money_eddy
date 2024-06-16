import { useMutation, useQuery, QueryKey, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Credentials {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

interface AuthResponse {
  message: string;
  user: string | null;
  token: string;

}

const fetchUser = async (): Promise<User> => {
  const { data } = await axios.get(`${backendUrl}/api/users/me`, { withCredentials: true });
  return data;
};

const loginUser = async (credentials: Credentials): Promise<AuthResponse> => {
  const { data } = await axios.post(`${backendUrl}/api/users/login`, credentials, { withCredentials: true });
  return data;
};

const registerUser = async (credentials: Credentials): Promise<User> => {
  const { data } = await axios.post(`${backendUrl}/api/users/register`, credentials);
  return data;
};

const logoutUser = async (): Promise<void> => {
  await axios.post(`${backendUrl}/api/users/logout`, {}, { withCredentials: true });
};

export const useUser = () => {
  const queryKey: QueryKey = ['user'];
  return useQuery({
    queryKey,
    queryFn: fetchUser,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
