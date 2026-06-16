import React, { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DangerZone = ({ deactivateAccount, deleteAccount }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }
    
    setIsDeleting(true);
    try {
      await deleteAccount();
      setShowDeleteModal(false);
      navigate('/');
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeactivateAccount = async () => {
    setIsDeactivating(true);
    try {
      await deactivateAccount();
      setShowDeactivateModal(false);
      navigate('/');
      toast.success('Account deactivated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to deactivate account');
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center">
          <HiOutlineExclamationTriangle className="h-5 w-5 text-danger-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-danger-600">
            Danger Zone
          </h2>
          <p className="text-sm text-text-secondary">
            Irreversible and destructive actions
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-5 bg-white border border-danger-200 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                Deactivate Account
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Temporarily disable your account. You can reactivate it anytime by logging back in.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDeactivateModal(true)}
              className="text-danger-600 border-danger-200 hover:bg-danger-50 flex-shrink-0"
            >
              Deactivate
            </Button>
          </div>
        </div>

        <div className="p-5 bg-danger-50/50 border border-danger-200 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-danger-700">
                Delete Account
              </h3>
              <p className="text-xs text-danger-600/80 mt-1">
                Permanently delete your account and all associated workspaces, projects, and tasks. This action cannot be undone.
              </p>
            </div>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => setShowDeleteModal(true)}
              className="flex-shrink-0"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Deactivate Account Modal */}
      <Modal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        title="Deactivate Account"
      >
        <div className="space-y-4">
          <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <p className="text-sm text-warning-800">
              Your account will be temporarily disabled. Your profile, projects, and tasks will be hidden from other users. 
              You can reactivate your account anytime by logging back in.
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button 
              variant="outline" 
              onClick={() => setShowDeactivateModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeactivateAccount}
              disabled={isDeactivating}
            >
              {isDeactivating ? 'Deactivating...' : 'Yes, Deactivate'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteConfirmation('');
        }}
        title="Delete Account"
      >
        <div className="space-y-4">
          <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
            <p className="text-sm text-danger-700">
              <span className="font-bold">Warning:</span> You are about to permanently delete your account. 
              All your data will be erased and cannot be recovered.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-text-primary">
              Please type <span className="font-bold font-mono">DELETE</span> to confirm.
            </p>
            <Input
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="DELETE"
              className="font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirmation('');
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== 'DELETE' || isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DangerZone;
