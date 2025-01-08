import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Trophy } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const { teamName, teamId } = location.state || {};

  if (!teamName || !teamId) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <BackButton />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="mb-6">
            <Trophy className="mx-auto h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, Team {teamName}!
          </h1>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-600 mb-2">Your Team ID is:</p>
            <p className="text-2xl font-mono font-bold text-blue-600">{teamId}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <p>Registration Successful</p>
            </div>
            <p className="text-gray-600">
              Please remember your password and Team ID for logging in.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  );
}