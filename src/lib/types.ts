export interface Update {
  id: string;
  date: string;
  author: string;
  message: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid' | 'Overdue';
  amount: number;
  updates: Update[];
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  date: string;
}
