import fs from 'fs';
import path from 'path';

const directoryToSearch = './src';

const replacements = [
  { regex: /(text|bg|border|ring|from|to|via)-indigo-(\d{2,3})/g, replace: '$1-primary-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-blue-(\d{2,3})/g, replace: '$1-primary-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-purple-(\d{2,3})/g, replace: '$1-accent-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-violet-(\d{2,3})/g, replace: '$1-accent-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-orange-(\d{2,3})/g, replace: '$1-accent-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-amber-(\d{2,3})/g, replace: '$1-warning-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-pink-(\d{2,3})/g, replace: '$1-accent-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-rose-(\d{2,3})/g, replace: '$1-accent-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-cyan-(\d{2,3})/g, replace: '$1-primary-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-sky-(\d{2,3})/g, replace: '$1-primary-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-teal-(\d{2,3})/g, replace: '$1-primary-$2' },
  { regex: /(text|bg|border|ring|from|to|via)-emerald-(\d{2,3})/g, replace: '$1-success-$2' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      replacements.forEach(({ regex, replace }) => {
        content = content.replace(regex, replace);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryToSearch);
console.log('Done!');
