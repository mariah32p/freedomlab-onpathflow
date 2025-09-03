export interface Client {
  id: string;
  name: string;
  email: string;
  goal: string;
  progress: number;
  created_at: string;
}

export interface Milestone {
  id: string;
  client_id: string;
  title: string;
  status: 'pending' | 'completed';
  due_date?: string;
  completed_at?: string;
}