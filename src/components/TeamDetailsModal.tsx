import React from 'react';
import { X } from 'lucide-react';
import { Team } from '../types/team';

interface TeamDetailsModalProps {
  team: Team;
  onClose: () => void;
}

export default function TeamDetailsModal({ team, onClose }: TeamDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Team Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Name</label>
            <p className="mt-1 text-sm text-gray-900">{team.team_name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Team ID</label>
            <p className="mt-1 text-sm text-gray-900">{team.team_id}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Lead</label>
            <p className="mt-1 text-sm text-gray-900">{team.team_lead}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Members</label>
            <p className="mt-1 text-sm text-gray-900">{team.team_members}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Score</label>
            <p className="mt-1 text-sm text-gray-900">{team.score}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Created At</label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(team.created_at).toLocaleString()}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Active</label>
            <p className="mt-1 text-sm text-gray-900">
              {team.last_active ? new Date(team.last_active).toLocaleString() : 'Never'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}