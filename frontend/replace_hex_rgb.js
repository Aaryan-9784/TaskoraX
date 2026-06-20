import fs from 'fs';
import path from 'path';

const directoryToSearch = './src';

const replacements = [
  // AuthInput.jsx: blue-500 rgb
  { regex: /rgba\(\s*59\s*,\s*130\s*,\s*246/g, replace: 'rgba(165, 42, 68' },
  // AnalyticsWidget.jsx: indigo-500 rgb
  { regex: /rgba\(\s*99\s*,\s*102\s*,\s*241/g, replace: 'rgba(128, 0, 32' },
  // AnalyticsWidget.jsx: cyan-500 rgb
  { regex: /rgba\(\s*6\s*,\s*182\s*,\s*212/g, replace: 'rgba(200, 43, 81' },
  // ProductivityChart.jsx: violet-500 rgb
  { regex: /rgba\(\s*139\s*,\s*92\s*,\s*246/g, replace: 'rgba(200, 43, 81' },
  
  // AdminDashboard.jsx: sparkline colors
  { regex: /rgba\(\s*129\s*,\s*140\s*,\s*248/g, replace: 'rgba(165, 42, 68' }, // indigo-400 -> primary-500
  { regex: /#818cf8/g, replace: '#A52A44' }, // indigo-400 hex
  
  { regex: /rgba\(\s*192\s*,\s*132\s*,\s*252/g, replace: 'rgba(200, 43, 81' }, // violet-400 -> accent-500
  { regex: /#c084fc/g, replace: '#C82B51' }, // violet-400 hex
  
  { regex: /rgba\(\s*56\s*,\s*189\s*,\s*248/g, replace: 'rgba(165, 42, 68' }, // sky-400 -> primary-500
  { regex: /#38bdf8/g, replace: '#A52A44' } // sky-400 hex
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
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

// Also process tailwind.config.js for glow colors
let twConfigPath = './tailwind.config.js';
let twConfig = fs.readFileSync(twConfigPath, 'utf8');
let origTwConfig = twConfig;
replacements.forEach(({ regex, replace }) => {
  twConfig = twConfig.replace(regex, replace);
});
if (twConfig !== origTwConfig) {
  fs.writeFileSync(twConfigPath, twConfig, 'utf8');
  console.log('Updated: tailwind.config.js');
}

console.log('Done!');
