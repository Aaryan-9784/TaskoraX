import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const TeamContext = createContext(null);

export const TeamProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [members, setMembers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeamData = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const [membersRes, activitiesRes] = await Promise.all([
        api.get('/team'),
        api.get('/activities'),
      ]);
      setMembers(membersRes.data.data.members);
      setActivities(activitiesRes.data.data.activities);
    } catch (error) {
      toast.error('Failed to fetch team data');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchTeamData();
  }, [fetchTeamData]);

  const updateMember = async (id, updates) => {
    try {
      const res = await api.put(`/team/${id}`, updates);
      setMembers((prev) =>
        prev.map((m) => (m._id === id ? res.data.data.member : m))
      );
      toast.success('Member updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update member');
    }
  };

  const addActivity = async (activityData) => {
    try {
      const res = await api.post('/activities', activityData);
      setActivities((prev) => [res.data.data.activity, ...prev].slice(0, 50));
    } catch (error) {
      console.error('Failed to record activity', error);
    }
  };

  const value = {
    members,
    activities,
    loading,
    fetchTeamData,
    updateMember,
    addActivity,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error('useTeam must be used within TeamProvider');
  return context;
};
