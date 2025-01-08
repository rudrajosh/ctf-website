import React from 'react';
import { X } from 'lucide-react';
import { Challenge } from '../types/challenge';
import { useFormState } from '../hooks/useFormState';
import { ChallengeFormData, validateChallengeForm, transformFormData } from '../utils/formValidation';
import DateTimeInput from './form/DateTimeInput';

interface ChallengeFormProps {
  challenge?: Challenge;
  onSubmit: (challenge: Partial<Challenge>) => Promise<void>;
  onClose: () => void;
}

export default function ChallengeForm({ challenge, onSubmit, onClose }: ChallengeFormProps) {
  const initialState: ChallengeFormData = {
    title: challenge?.title || '',
    description: challenge?.description || '',
    points: challenge?.points?.toString() || '100',
    rules: challenge?.rules || '',
    rewards: challenge?.rewards || '',
    participant_limit: challenge?.participant_limit?.toString() || '0',
    start_time: challenge?.start_time || new Date().toISOString().slice(0, 16),
    end_time: challenge?.end_time || new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    timezone: challenge?.timezone || 'UTC',
    is_recurring: challenge?.is_recurring || false,
    recurrence_pattern: challenge?.recurrence_pattern || '',
    is_active: challenge?.is_active || false,
    flag: challenge?.flag || '',
  };

  const { formData, errors, updateField, setErrors } = useFormState<ChallengeFormData>(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateChallengeForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    await onSubmit(transformFormData(formData));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{challenge ? 'Edit Challenge' : 'New Challenge'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600">{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Points</label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => updateField('points', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Description and Rules */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rules</label>
              <textarea
                value={formData.rules}
                onChange={(e) => updateField('rules', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={2}
              />
            </div>
          </div>

          {/* Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateTimeInput
              label="Start Time"
              value={formData.start_time}
              onChange={(value) => updateField('start_time', value)}
              required
            />
            <DateTimeInput
              label="End Time"
              value={formData.end_time}
              onChange={(value) => updateField('end_time', value)}
              required
            />
          </div>

          {/* Additional Settings */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => updateField('is_active', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_recurring}
                onChange={(e) => updateField('is_recurring', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Recurring</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {challenge ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}