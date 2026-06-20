import fs from 'fs';
import path from 'path';

const directoryToSearch = './src';

const replacements = [
  // AuthInput.jsx blue focus ring and others
  { regex: /#3B82F6/gi, replace: '#A52A44' }, // blue-500 -> Light Maroon
  { regex: /#6366f1/gi, replace: '#800020' }, // indigo-500 -> Primary Maroon
  { regex: /#06B6D4/gi, replace: '#C82B51' }, // cyan-500 -> Accent 500
  { regex: /#8b5cf6/gi, replace: '#A5183A' }, // violet-500 -> Accent 600
  { regex: /#ec4899/gi, replace: '#D95878' }, // pink-500 -> Accent 400
  // emerald and amber are semantic (success/warning), but in charts they ruin the maroon theme.
  // let's replace them in the COLORS array specifically:
  { regex: /\['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'\]/g, replace: "['#800020', '#A52A44', '#C82B51', '#D95878', '#6E001B', '#F0B8C7', '#5C0014']" },
  { regex: /\['#ef4444', '#f59e0b', '#22c55e', '#3b82f6'\]/g, replace: "['#800020', '#A52A44', '#C82B51', '#5C0014']" },
  
  // Specific Recharts strokes/fills that use emerald/green but might need to be themed
  { regex: /#10b981/gi, replace: '#A52A44' }, // Replace remaining chart emerald with Light Maroon
  { regex: /#059669/gi, replace: '#800020' }, // emerald-600 -> Primary Maroon
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
        console.log(`Updated hex in: ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryToSearch);
console.log('Done hex replace!');
