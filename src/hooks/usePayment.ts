import { useMutation, useQuery, QueryKey, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PaymentCreate, PaymentsResponse } from '../types/Payments';
import { toast } from 'react-hot-toast';


const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Payment {
  id: number;
  loanId: number;
  amount: number;
  paymentDate: string;
  status: 'pending' | 'completed' | 'failed';
}

const fetchPayments = async (): Promise<PaymentsResponse[]> => {
  const { data } = await axios.get(`${backendUrl}/api/payments`);
  return data;
};

const fetchPaymentById = async (id: string): Promise<Payment> => {
  const { data } = await axios.get(`${backendUrl}/api/payments/${id}`);
  return data;
};

const createPayment = async (payment: Omit<PaymentCreate, 'id'>): Promise<Payment> => {
  const { data } = await axios.post(`${backendUrl}/api/payments`, payment);
  return data;
};

const updatePayment = async ({ id, payment }: { id: string; payment: Omit<Payment, 'id'> }): Promise<Payment> => {
  const { data } = await axios.put(`${backendUrl}/api/payments/${id}`, payment);
  return data;
};

const deletePayment = async (id: string): Promise<void> => {
  await axios.delete(`${backendUrl}/api/payments/${id}`);
};

export const usePayments = () => {
  const queryKey: QueryKey = ['payments'];
  return useQuery({
    queryKey,
    queryFn: fetchPayments,
  });
};

export const usePayment = (id: string) => {
  const queryKey: QueryKey = ['payment', id];
  return useQuery({
    queryKey,
    queryFn: () => fetchPaymentById(id),
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Pago creado correctamente');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      toast.success('Pago actualizado correctamente');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Pago eliminado correctamente');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};
