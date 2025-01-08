import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Challenge } from '../types/challenge';

interface ChallengeTableProps {
  challenges: Challenge[];
  onViewChallenge: (challenge: Challenge) => void;
  onEditChallenge: (challenge: Challenge) => void;
  onDeleteChallenge: (challengeId: string) => void;
}

export default function ChallengeTable({
  challenges,
  onViewChallenge,
  onEditChallenge,
  onDeleteChallenge,
}: ChallengeTableProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Points
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Participants
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {challenges.map((challenge, index) => (
            <tr key={challenge.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {challenge.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {challenge.points}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  challenge.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {challenge.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {challenge.participant_count}
                {challenge.participant_limit > 0 && ` / ${challenge.participant_limit}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-3">
                <button
                  onClick={() => onViewChallenge(challenge)}
                  className="text-blue-600 hover:text-blue-900"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onEditChallenge(challenge)}
                  className="text-yellow-600 hover:text-yellow-900"
                  title="Edit Challenge"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDeleteChallenge(challenge.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete Challenge"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}