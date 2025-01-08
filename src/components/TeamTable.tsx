import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { Team } from '../types/team';

interface TeamTableProps {
  teams: Team[];
  onViewTeam: (team: Team) => void;
  onDeleteTeam: (teamId: string) => void;
}

export default function TeamTable({ teams, onViewTeam, onDeleteTeam }: TeamTableProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team Lead
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teams.map((team, index) => (
            <tr key={team.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.team_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.team_lead}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.score}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-3">
                <button
                  onClick={() => onViewTeam(team)}
                  className="text-blue-600 hover:text-blue-900"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDeleteTeam(team.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete Team"
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