import React, { useEffect, useState } from 'react';
import { Flag, Code, Target } from 'lucide-react';
import ActionButton from '../components/ActionButton';

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">CTF: Catch, Code, Mark</h1>
          <p className="text-xl text-gray-300 mb-8">Challenge yourself in the ultimate coding competition</p>
          
          <div className="flex justify-center gap-8 mb-12">
            <div className="flex flex-col items-center">
              <Flag className="w-12 h-12 mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold">Catch</h3>
              <p className="text-gray-400">Find the flags</p>
            </div>
            <div className="flex flex-col items-center">
              <Code className="w-12 h-12 mb-4 text-green-400" />
              <h3 className="text-lg font-semibold">Code</h3>
              <p className="text-gray-400">Solve challenges</p>
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-12 h-12 mb-4 text-red-400" />
              <h3 className="text-lg font-semibold">Mark</h3>
              <p className="text-gray-400">Score points</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <ActionButton to={showLogin ? "/login" : "/register"}>
              {showLogin ? "Login" : "Register Now"}
            </ActionButton>
            {!showLogin && (
              <ActionButton to="/login">
                Already registered? Login
              </ActionButton>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-300">
            <li>Register your team and get a unique team ID</li>
            <li>Login to access the challenges</li>
            <li>Solve challenges to earn points</li>
            <li>Compete with other teams on the leaderboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}