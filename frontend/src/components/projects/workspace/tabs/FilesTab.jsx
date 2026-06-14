import { HiOutlineDocumentText, HiOutlineArrowUpTray } from 'react-icons/hi2';
import Button from '../../../common/Button';

const FilesTab = () => {
  return (
    <div className="p-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Project Files</h3>
        <Button icon={HiOutlineArrowUpTray}>Upload File</Button>
      </div>
      <div className="flex-1 glass-panel border border-border/40 rounded-xl flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-border/60">
            <HiOutlineDocumentText className="h-8 w-8 text-text-tertiary" />
          </div>
          <h4 className="text-base font-bold text-text-primary mb-1">No files attached</h4>
          <p className="text-sm text-text-secondary max-w-sm">Upload documents, images, and other assets here.</p>
        </div>
      </div>
    </div>
  );
};

export default FilesTab;
