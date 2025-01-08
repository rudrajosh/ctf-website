import { Challenge } from '../types/challenge';

export interface ChallengeFormData {
  title: string;
  description: string;
  points: string;
  rules: string;
  rewards: string;
  participant_limit: string;
  start_time: string;
  end_time: string;
  timezone: string;
  is_recurring: boolean;
  recurrence_pattern: string;
  is_active: boolean;
  flag: string;
}

export const validateChallengeForm = (data: ChallengeFormData): string[] => {
  const errors: string[] = [];
  
  if (!data.title.trim()) errors.push('Title is required');
  if (!data.description.trim()) errors.push('Description is required');
  if (isNaN(parseInt(data.points))) errors.push('Points must be a valid number');
  if (new Date(data.end_time) <= new Date(data.start_time)) {
    errors.push('End time must be after start time');
  }
  
  return errors;
};

export const transformFormData = (formData: ChallengeFormData): Partial<Challenge> => ({
  ...formData,
  points: parseInt(formData.points) || 0,
  participant_limit: parseInt(formData.participant_limit) || 0,
});