import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Award } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('points', { ascending: true });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      toast.error('Failed to load challenges');
    }
  };

  const handleSubmitFlag = async (challengeId: string) => {
    const flag = prompt('Enter the flag:');
    if (!flag) return;

    // In a real application, you would verify the flag server-side
    toast.success('Challenge completed!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Award className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Challenges</h2>
          <p className="mt-2 text-gray-600">Solve challenges to earn points and climb the leaderboard!</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{challenge.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {challenge.points} points
                  </span>
                  <button
                    onClick={() => handleSubmitFlag(challenge.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit Flag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}