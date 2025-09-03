export interface Client {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  goal_title: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface GoalPath {
  id: string;
  client_id: string;
  title: string;
  description?: string;
  target_date?: string;
  status: 'active' | 'completed' | 'paused';
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  goal_path_id: string;
  title: string;
  description?: string;
  due_date?: string;
  status: 'pending' | 'in_progress' | 'completed';
  order_index: number;
  completed_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ProgressUpdate {
  id: string;
  milestone_id: string;
  client_id: string;
  content: string;
  progress_percentage?: number;
  created_at: string;
}