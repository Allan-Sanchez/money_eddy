// src/hooks/useAuth.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
    token: string;
}

const fetchUser = async () => {
  const { data } = await axios.get('http://localhost:3000/api/use');
  return data;
};

const loginUser = async (credentials: Credentials): Promise<LoginResponse> => {
  const { data } = await axios.post('http://localhost:3000/api/login', credentials);
  return data;
};

import { QueryKey } from '@tanstack/react-query';

export const useUser = () => {
  const queryKey: QueryKey = ['user']; // Provide a valid QueryKey value
  return useQuery({
    queryKey: queryKey,
    queryFn: fetchUser,
  });
};

export const useLogin = () => {
  return useMutation<unknown, Error, Credentials>({
    mutationFn: loginUser,
  });
};
