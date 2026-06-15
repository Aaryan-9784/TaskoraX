import { getInitials } from '../../utils/helpers';
import Button from '../common/Button';
import { HiOutlinePencilSquare, HiOutlineCog6Tooth, HiOutlineKey } from 'react-icons/hi2';

const ProfileHeader = ({ user, onEditProfile, onChangePassword }) => {
  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      {/* Banner */}
      <div className="h-40 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-900/20 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4 mix-blend-overlay"></div>
      </div>

      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 mb-4">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-surface-secondary border-4 border-white shadow-lg flex items-center justify-center text-primary-600 text-3xl font-bold flex-shrink-0 z-10 relative overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(user?.name)
                )}
              </div>
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-success-500 border-2 border-white rounded-full z-20" title="Online"></div>
            </div>
            
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-text-primary tracking-tight">
                  {user?.name || 'User'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium border border-primary-100">
                  {user?.role || 'Member'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-text-secondary">
                <span>{user?.email}</span>
                <span className="hidden sm:inline text-border/60">•</span>
                <span>TaskoraX Workspace</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 pb-1">
            <Button
              variant="secondary"
              size="sm"
              icon={HiOutlinePencilSquare}
              onClick={onEditProfile}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={HiOutlineKey}
              onClick={onChangePassword}
            >
              Password
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={HiOutlineCog6Tooth}
              className="px-2"
              title="Settings"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
