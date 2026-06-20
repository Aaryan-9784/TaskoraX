import { useState } from 'react';
import { 
  HiOutlineDocumentText, 
  HiOutlineArrowUpTray, 
  HiOutlineArrowDownTray, 
  HiOutlineTrash, 
  HiOutlinePhoto,
  HiOutlineTableCells,
  HiOutlinePresentationChartBar,
  HiOutlineArchiveBox,
  HiOutlineVideoCamera,
  HiOutlineCodeBracket
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import Button from '../../../common/Button';

const getFileTypeInfo = (filename) => {
  if (!filename) return { icon: HiOutlineDocumentText, color: 'text-text-tertiary', bg: 'bg-surface-secondary', label: 'FILE' };
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf':
      return { icon: HiOutlineDocumentText, color: 'text-error-500', bg: 'bg-error-500/10', label: 'PDF' };
    case 'doc':
    case 'docx':
    case 'txt':
      return { icon: HiOutlineDocumentText, color: 'text-primary-500', bg: 'bg-primary-500/10', label: 'DOC' };
    case 'xls':
    case 'xlsx':
    case 'csv':
      return { icon: HiOutlineTableCells, color: 'text-success-500', bg: 'bg-success-500/10', label: 'SPREADSHEET' };
    case 'ppt':
    case 'pptx':
      return { icon: HiOutlinePresentationChartBar, color: 'text-warning-500', bg: 'bg-warning-500/10', label: 'PRESENTATION' };
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
      return { icon: HiOutlineArchiveBox, color: 'text-text-secondary', bg: 'bg-surface-tertiary', label: 'ARCHIVE' };
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'mkv':
      return { icon: HiOutlineVideoCamera, color: 'text-accent-500', bg: 'bg-accent-500/10', label: 'VIDEO' };
    case 'js':
    case 'jsx':
    case 'html':
    case 'css':
    case 'json':
      return { icon: HiOutlineCodeBracket, color: 'text-primary-500', bg: 'bg-primary-500/10', label: 'CODE' };
    default:
      return { icon: HiOutlineDocumentText, color: 'text-text-tertiary', bg: 'bg-surface-secondary', label: ext.substring(0, 4).toUpperCase() || 'FILE' };
  }
};

const FilesTab = ({ project, onUpdateProject }) => {
  const files = project.files || [];

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.size > 1.5 * 1024 * 1024) {
        toast.error('File size must be less than 1.5MB for this demo.');
        return;
      }

      const reader = new FileReader();
      
      reader.onloadend = () => {
        const isImage = file.type.startsWith('image/');
        const newFile = {
          id: Date.now(),
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          date: new Date().toLocaleDateString(),
          url: reader.result,
          isImage: isImage
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
      try {
        // Handle data URLs specifically to avoid browser blocks on direct top-level navigation
        if (file.url.startsWith('data:')) {
          const arr = file.url.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          const blobUrl = URL.createObjectURL(blob);
          const newWindow = window.open(blobUrl, '_blank', 'noopener,noreferrer');
          if (!newWindow) {
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = file.name;
            a.click();
            toast.error('Popup blocked. Downloading file instead.');
          }
          setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        } else {
          const newWindow = window.open(file.url, '_blank', 'noopener,noreferrer');
          if (!newWindow) {
            const a = document.createElement('a');
            a.href = file.url;
            a.download = file.name;
            a.click();
            toast.error('Popup blocked. Downloading file instead.');
          }
        }
      } catch (err) {
        const a = document.createElement('a');
        a.href = file.url;
        a.download = file.name;
        a.click();
      }
    } else {
      toast.success(`Opened ${file.name}`);
    }
  };

  const handleDownloadFile = (e, file) => {
    e.stopPropagation();
    if (file.url) {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      a.click();
      toast.success(`Downloading ${file.name}`);
    } else {
      toast.error('Cannot download this file');
    }
  };

  const handleDeleteFile = (e, fileId) => {
    e.stopPropagation();
    onUpdateProject({
      ...project,
      files: files.filter(f => f.id !== fileId)
    });
    toast.success('File deleted');
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {files.map(f => {
            const isImg = f.isImage || (f.url && f.url.startsWith('data:image'));
            const fileInfo = getFileTypeInfo(f.name);
            const IconComponent = isImg ? HiOutlinePhoto : fileInfo.icon;
            
            return (
              <div key={f.id} className="glass-panel rounded-xl border border-border/40 overflow-hidden hover:border-border/80 transition-all hover:shadow-lg hover:-translate-y-1 group flex flex-col">
                {/* Preview Area */}
                <div 
                  className={`h-40 flex items-center justify-center cursor-pointer relative overflow-hidden ${isImg ? 'bg-surface-secondary' : fileInfo.bg}`}
                  onClick={() => handleOpenFile(f)}
                >
                  {isImg ? (
                    <img src={f.url} alt={f.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className={`w-14 h-14 ${fileInfo.color} mb-3`} />
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${fileInfo.color} bg-white shadow-sm ring-1 ring-border/50`}>
                        {fileInfo.label}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover Actions Overlay */}
                  <div className="absolute inset-0 bg-surface-primary/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={(e) => handleDownloadFile(e, f)} 
                      className="p-2.5 bg-surface-secondary hover:bg-white text-text-primary rounded-xl shadow-sm transition-colors" 
                      title="Download"
                    >
                      <HiOutlineArrowDownTray className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => handleDeleteFile(e, f.id)} 
                      className="p-2.5 bg-error-50 hover:bg-error-500 text-error-600 hover:text-white rounded-xl shadow-sm transition-colors" 
                      title="Delete"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* File Details */}
                <div className="p-4 bg-surface-primary flex-1 border-t border-border/40 cursor-pointer" onClick={() => handleOpenFile(f)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isImg ? 'bg-accent-500/10 text-accent-500' : fileInfo.bg + ' ' + fileInfo.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-text-primary truncate" title={f.name}>{f.name}</h4>
                      <p className="text-xs text-text-secondary mt-0.5 truncate">{f.size} • {f.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
