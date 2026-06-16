import { getInitials } from '../../utils/helpers';
import { 
  HiOutlinePencilSquare, 
  HiOutlineKey, 
  HiOutlineCheckBadge, 
  HiOutlineEnvelope, 
  HiOutlineBriefcase 
} from 'react-icons/hi2';

const ProfileHeader = ({ user, onEditProfile, onChangePassword }) => {
  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm relative">
      
      {/* Premium Vibrant Banner */}
      <div className="h-40 relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700">
        {/* Subtle decorative overlays */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="px-6 sm:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          
          {/* Avatar & Profile Info */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            
            {/* Avatar */}
            <div className="-mt-12 sm:-mt-16 relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-full h-full rounded-full border-4 border-white shadow-md flex items-center justify-center text-primary-600 text-3xl sm:text-4xl font-bold overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(user?.name)
                )}
              </div>
              <div className="absolute bottom-1 sm:bottom-1.5 right-1 sm:right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-success-500 border-2 sm:border-[3px] border-white rounded-full z-20 shadow-sm" title="Online"></div>
            </div>
            
            {/* Name and Details */}
            <div className="text-center sm:text-left mt-3 sm:mt-0 pb-1 sm:pb-2">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight leading-none">
                  {user?.name || 'User'}
                </h2>
                <HiOutlineCheckBadge className="w-6 h-6 sm:w-7 sm:h-7 text-primary-500 flex-shrink-0" title="Verified Account" />
                <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-[11px] font-bold uppercase tracking-wider border border-primary-100 flex-shrink-0">
                  {user?.role || 'Member'}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-sm text-text-secondary font-medium mt-2">
                <div className="flex items-center gap-1.5">
                  <HiOutlineEnvelope className="w-4.5 h-4.5 text-text-tertiary" />
                  <span>{user?.email || 'No email provided'}</span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border/80"></div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineBriefcase className="w-4.5 h-4.5 text-text-tertiary" />
                  <span>TaskoraX Workspace</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 pb-1 lg:pb-2">
            <button 
              onClick={onEditProfile}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-primary-600/20"
            >
              <HiOutlinePencilSquare className="w-4.5 h-4.5" />
              Edit Profile
            </button>
            <button 
              onClick={onChangePassword}
              className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-surface-secondary text-text-primary text-sm font-semibold rounded-xl transition-all border border-border/60 shadow-sm"
            >
              <HiOutlineKey className="w-4.5 h-4.5 text-text-secondary" />
              Security
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
