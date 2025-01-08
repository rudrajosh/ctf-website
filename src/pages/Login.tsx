import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { signInAdmin, signInTeam } from '../lib/auth';
import { useFormState } from '../hooks/useFormState';

interface LoginFormData {
  identifier: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { formData, updateField, resetForm } = useFormState<LoginFormData>({
    identifier: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isAdmin) {
        await signInAdmin(formData.identifier, formData.password);
        toast.success('Admin login successful!');
        navigate('/admin');
      } else {
        await signInTeam(formData.identifier, formData.password);
        toast.success('Team login successful!');
        navigate('/challenges');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
      resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              !isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => {
              setIsAdmin(false);
              resetForm();
            }}
          >
            Participant
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => {
              setIsAdmin(true);
              resetForm();
            }}
          >
            Admin
          </button>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                {isAdmin ? 'Email' : 'Team ID'}
              </label>
              <input
                id="identifier"
                type={isAdmin ? 'email' : 'text'}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.identifier}
                onChange={(e) => updateField('identifier', e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}