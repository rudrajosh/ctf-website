import React from 'react';
import { X } from 'lucide-react';
import { Challenge } from '../types/challenge';

interface ChallengeDetailsModalProps {
  challenge: Challenge;
  onClose: () => void;
}

export default function ChallengeDetailsModal({ challenge, onClose }: ChallengeDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Challenge Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <p className="mt-1 text-sm text-gray-900">{challenge.title}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{challenge.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Rules</label>
            <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{challenge.rules}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Rewards</label>
            <p className="mt-1 text-sm text-gray-900">{challenge.rewards}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Points</label>
              <p className="mt-1 text-sm text-gray-900">{challenge.points}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  challenge.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {challenge.is_active ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(challenge.start_time).toLocaleString()}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(challenge.end_time).toLocaleString()}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Participants</label>
              <p className="mt-1 text-sm text-gray-900">
                {challenge.participant_count}
                {challenge.participant_limit > 0 && ` / ${challenge.participant_limit}`}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Recurring</label>
              <p className="mt-1 text-sm text-gray-900">
                {challenge.is_recurring ? 'Yes' : 'No'}
                {challenge.is_recurring && challenge.recurrence_pattern && 
                  ` - ${challenge.recurrence_pattern}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}