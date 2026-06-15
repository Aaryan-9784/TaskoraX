import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';
import { 
  HiOutlineUser, 
  HiOutlineEnvelope, 
  HiOutlinePhone, 
  HiOutlineMapPin, 
  HiOutlineBuildingOffice, 
  HiOutlineBriefcase 
} from 'react-icons/hi2';

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-secondary/50 transition-colors">
    <div className="w-10 h-10 rounded-lg bg-surface-secondary border border-border/50 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon className="w-5 h-5 text-text-secondary" />
    </div>
    <div>
      <p className="text-xs font-medium text-text-tertiary mb-0.5 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value || <span className="text-text-tertiary italic">Not provided</span>}</p>
    </div>
  </div>
);

const PersonalInfo = ({ user, updateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Initialize with user data + mocked missing fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+1 (555) 123-4567', // Mocked
    location: 'San Francisco, CA', // Mocked
    department: 'Engineering', // Mocked
    role: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        bio: user.bio || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // In a real app, you'd send all formData to the backend.
      // Here we update what's supported by the AuthContext.
      await updateProfile({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        bio: formData.bio,
      });
      setIsEditing(false);
      toast.success('Personal information updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between bg-surface-secondary/30">
        <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit Details
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} isLoading={loading}>
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="p-6">
        {isEditing ? (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                name="name"
                icon={HiOutlineUser}
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                icon={HiOutlineEnvelope}
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Phone Number"
                name="phone"
                icon={HiOutlinePhone}
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Location"
                name="location"
                icon={HiOutlineMapPin}
                value={formData.location}
                onChange={handleChange}
              />
              <Input
                label="Department"
                name="department"
                icon={HiOutlineBuildingOffice}
                value={formData.department}
                onChange={handleChange}
              />
              <Input
                label="Role"
                name="role"
                icon={HiOutlineBriefcase}
                value={formData.role}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-primary">
                Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                placeholder="Write a short introduction..."
                value={formData.bio}
                onChange={handleChange}
                className="input-field resize-none w-full"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <InfoItem icon={HiOutlineUser} label="Full Name" value={formData.name} />
              <InfoItem icon={HiOutlineEnvelope} label="Email Address" value={formData.email} />
              <InfoItem icon={HiOutlinePhone} label="Phone Number" value={formData.phone} />
              <InfoItem icon={HiOutlineMapPin} label="Location" value={formData.location} />
              <InfoItem icon={HiOutlineBuildingOffice} label="Department" value={formData.department} />
              <InfoItem icon={HiOutlineBriefcase} label="Role" value={formData.role} />
            </div>
            
            <div className="pt-4 border-t border-border/30">
              <p className="text-xs font-medium text-text-tertiary mb-2 uppercase tracking-wider px-3">Bio</p>
              <div className="p-4 rounded-xl bg-surface-secondary/50 text-sm text-text-secondary leading-relaxed">
                {formData.bio ? formData.bio : <span className="italic text-text-tertiary">No bio provided. Click Edit Details to add one.</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
