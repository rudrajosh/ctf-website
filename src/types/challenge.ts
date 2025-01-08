export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  start_time: string;
  end_time: string;
  rules: string;
  rewards: string;
  participant_limit: number;
  timezone: string;
  is_recurring: boolean;
  recurrence_pattern?: string;
  participant_count: number;
  is_active: boolean;
  flag: string;
}