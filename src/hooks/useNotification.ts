import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Notification {
  borrowerId: number;
  message: string;
}

const sendPaymentReminder = async (notification: Notification): Promise<void> => {
  await axios.post(`${backendUrl}/api/notifications/send-payment-reminder`, notification);
};

export const useSendPaymentReminder = () => {
  return useMutation({
    mutationFn: sendPaymentReminder,
  });
};
