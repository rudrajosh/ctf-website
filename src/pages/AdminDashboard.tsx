import React, { useEffect, useState } from 'react';
import { Trophy, Plus, Flag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import BackButton from '../components/BackButton';
import TeamTable from '../components/TeamTable';
import TeamDetailsModal from '../components/TeamDetailsModal';
import ChallengeTable from '../components/ChallengeTable';
import ChallengeForm from '../components/ChallengeForm';
import ChallengeDetailsModal from '../components/ChallengeDetailsModal';
import { Team } from '../types/team';
import { Challenge } from '../types/challenge';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showChallenges, setShowChallenges] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [viewingChallenge, setViewingChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    checkAdminAccess();
    loadTeams();
    loadChallenges();

    const subscription = supabase
      .channel('changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, loadTeams)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'challenges' }, loadChallenges)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast.error('Admin access required');
      navigate('/login');
      return;
    }
  };

  const loadTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('score', { ascending: false });

      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      toast.error('Failed to load teams');
    }
  };

  const loadChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      toast.error('Failed to load challenges');
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (!window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('team_id', teamId);

      if (error) throw error;
      toast.success('Team deleted successfully');
      setSelectedTeam(null);
      await loadTeams();
    } catch (error) {
      toast.error('Failed to delete team');
    }
  };

  const handleDeleteChallenge = async (challengeId: string) => {
    if (!window.confirm('Are you sure you want to delete this challenge? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('challenges')
        .delete()
        .eq('id', challengeId);

      if (error) throw error;
      toast.success('Challenge deleted successfully');
      await loadChallenges();
    } catch (error) {
      toast.error('Failed to delete challenge');
    }
  };

  const handleSubmitChallenge = async (challenge: Partial<Challenge>) => {
    try {
      if (selectedChallenge) {
        const { error } = await supabase
          .from('challenges')
          .update(challenge)
          .eq('id', selectedChallenge.id);

        if (error) throw error;
        toast.success('Challenge updated successfully');
      } else {
        const { error } = await supabase
          .from('challenges')
          .insert([challenge]);

        if (error) throw error;
        toast.success('Challenge created successfully');
      }
      
      setShowChallengeForm(false);
      setSelectedChallenge(null);
      await loadChallenges();
    } catch (error) {
      toast.error(selectedChallenge ? 'Failed to update challenge' : 'Failed to create challenge');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            {showChallenges ? (
              <Flag className="h-12 w-12 text-blue-600 mr-4" />
            ) : (
              <Trophy className="h-12 w-12 text-blue-600 mr-4" />
            )}
            <h2 className="text-3xl font-extrabold text-gray-900">
              {showChallenges ? 'Challenge Management' : 'Team Management'}
            </h2>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowChallenges(!showChallenges)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {showChallenges ? 'Show Teams' : 'Show Challenges'}
            </button>
            {showChallenges && (
              <button
                onClick={() => {
                  setSelectedChallenge(null);
                  setShowChallengeForm(true);
                }}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Challenge
              </button>
            )}
          </div>
        </div>

        {!showChallenges ? (
          <TeamTable
            teams={teams}
            onViewTeam={setSelectedTeam}
            onDeleteTeam={handleDeleteTeam}
          />
        ) : (
          <ChallengeTable
            challenges={challenges}
            onViewChallenge={setViewingChallenge}
            onEditChallenge={(challenge) => {
              setSelectedChallenge(challenge);
              setShowChallengeForm(true);
            }}
            onDeleteChallenge={handleDeleteChallenge}
          />
        )}

        {selectedTeam && (
          <TeamDetailsModal
            team={selectedTeam}
            onClose={() => setSelectedTeam(null)}
          />
        )}

        {showChallengeForm && (
          <ChallengeForm
            challenge={selectedChallenge || undefined}
            onSubmit={handleSubmitChallenge}
            onClose={() => {
              setShowChallengeForm(false);
              setSelectedChallenge(null);
            }}
          />
        )}

        {viewingChallenge && (
          <ChallengeDetailsModal
            challenge={viewingChallenge}
            onClose={() => setViewingChallenge(null)}
          />
        )}
      </div>
    </div>
  );
}