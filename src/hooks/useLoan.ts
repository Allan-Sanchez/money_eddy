import { useMutation, useQuery, QueryKey, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {LoanCreate, LoansResponse} from '../types/Loans';
import { toast } from 'react-hot-toast';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Loan {
  id: number;
  borrowerId: number;
  amount: number;
  interestRate: number;
  duration: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'defaulted';
}

const fetchLoans = async (): Promise<LoansResponse[]> => {
  const { data } = await axios.get(`${backendUrl}/api/loans`);
  return data;
};

const fetchLoanById = async (id: string): Promise<Loan> => {
  const { data } = await axios.get(`${backendUrl}/api/loans/${id}`);
  return data;
};

const createLoan = async (loan: Omit<LoanCreate, 'id'>): Promise<Loan> => {
  const { data } = await axios.post(`${backendUrl}/api/loans`, loan);
  return data;
};

const updateLoan = async ({ id, loan }: { id: string; loan: Omit<Loan, 'id'> }): Promise<Loan> => {
  const { data } = await axios.put(`${backendUrl}/api/loans/${id}`, loan);
  return data;
};

const deleteLoan = async (id: string): Promise<void> => {
  await axios.delete(`${backendUrl}/api/loans/${id}`);
};

export const useLoans = () => {
  const queryKey: QueryKey = ['loans'];
  return useQuery({
    queryKey,
    queryFn: fetchLoans,
  });
};

export const useLoan = (id: string) => {
  const queryKey: QueryKey = ['loan', id];
  return useQuery({
    queryKey,
    queryFn: () => fetchLoanById(id),
  });
};

export const useCreateLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loan'] });
      toast.success('préstamo creado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};

export const useUpdateLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loan'] });
      toast.success('Préstamo actualizado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};

export const useDeleteLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};
