import { useMutation, useQuery, QueryKey, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BorrowersResponse } from '../types/Borrowers';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Borrower {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const fetchBorrowers = async (): Promise<BorrowersResponse[]> => {
  const { data } = await axios.get(`${backendUrl}/api/borrowers`);
  return data;
};

const fetchBorrowerById = async (id: string): Promise<Borrower> => {
  const { data } = await axios.get(`${backendUrl}/api/borrowers/${id}`);
  return data;
};

const createBorrower = async (borrower: Omit<Borrower, 'id'>): Promise<Borrower> => {
  const { data } = await axios.post(`${backendUrl}/api/borrowers`, borrower);
  return data;
};

const updateBorrower = async ({ id, borrower }: { id: string; borrower: Omit<Borrower, 'id'> }): Promise<Borrower> => {
  const { data } = await axios.put(`${backendUrl}/api/borrowers/${id}`, borrower);
  return data;
};

const deleteBorrower = async (id: string): Promise<void> => {
  await axios.delete(`${backendUrl}/api/borrowers/${id}`);
};

export const useBorrowers = () => {
  const queryKey: QueryKey = ['borrowers'];
  return useQuery({
    queryKey,
    queryFn: fetchBorrowers,
  });
};

export const useBorrower = (id: string) => {
  const queryKey: QueryKey = ['borrower', id];
  return useQuery({
    queryKey,
    queryFn: () => fetchBorrowerById(id),
  });
};

export const useCreateBorrower = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBorrower,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['borrowers'] });
      queryClient.invalidateQueries({ queryKey: ['borrower'] });
    },
  });
};

export const useUpdateBorrower = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBorrower,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['borrowers'] });
    },
  });
};

export const useDeleteBorrower = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBorrower,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['borrowers'] });
    },
  });
};
