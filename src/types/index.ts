export interface Client {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  goal: string;
  created_at: string;
  updated_at: string;
  client_password?: string;
}

export interface Milestone {
  id: string;
  client_id: string;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}