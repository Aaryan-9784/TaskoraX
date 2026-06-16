import { useState } from 'react';
import { HiOutlineDocumentText, HiOutlineArrowUpTray } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import Button from '../../../common/Button';

const FilesTab = ({ project, onUpdateProject }) => {
  // Ensure project has a files array
  const files = project.files || [];

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Limit file size to 1.5MB to prevent localStorage overflow
      if (file.size > 1.5 * 1024 * 1024) {
        toast.error('File size must be less than 1.5MB for this demo.');
        return;
      }

      const reader = new FileReader();
      
      reader.onloadend = () => {
        const newFile = {
          id: Date.now(),
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          date: new Date().toLocaleDateString(),
          url: reader.result
        };
        
        try {
          onUpdateProject({
            ...project,
            files: [...files, newFile]
          });
          toast.success(`Uploaded ${file.name}`);
        } catch (error) {
          toast.error('Storage limit exceeded. Try deleting old files or uploading a smaller one.');
        }
      };

      reader.onerror = () => {
        toast.error('Failed to read file.');
      };

      reader.readAsDataURL(file);
    }
  };

  const handleOpenFile = (file) => {
    if (file.url) {
      // Create a temporary window or tab to display the file
      try {
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<iframe src="${file.url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        } else {
          // Fallback if popup blocker prevents new window
          window.location.href = file.url;
        }
      } catch (err) {
        // Fallback for some browsers that restrict data URLs in new tabs
        const a = document.createElement('a');
        a.href = file.url;
        a.download = file.name;
        a.click();
      }
    } else {
      toast.success(`Opened ${file.name}`);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Project Files</h3>
        <label className="cursor-pointer">
          <input type="file" className="hidden" onChange={handleFileUpload} />
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm">
            <HiOutlineArrowUpTray className="w-5 h-5" />
            <span>Upload File</span>
          </div>
        </label>
      </div>

      {files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map(f => (
            <div key={f.id} className="glass-panel p-4 rounded-xl border border-border/40 flex items-start gap-4 hover:border-border/80 transition-colors cursor-pointer" onClick={() => handleOpenFile(f)}>
              <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center shrink-0">
                <HiOutlineDocumentText className="w-6 h-6 text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-text-primary truncate">{f.name}</h4>
                <p className="text-xs text-text-secondary mt-1">{f.size} • {f.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 glass-panel border border-border/40 rounded-xl flex items-center justify-center p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-border/60">
              <HiOutlineDocumentText className="h-8 w-8 text-text-tertiary" />
            </div>
            <h4 className="text-base font-bold text-text-primary mb-1">No files attached</h4>
            <p className="text-sm text-text-secondary max-w-sm">Upload documents, images, and other assets here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesTab;
