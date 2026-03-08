import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'app', 'calendars');
const folders = ['big-events', 'business', 'civic', 'date-night', 'family', 'live-music', 'outdoor', 'parent'];

for (const folder of folders) {
    const routeFile = path.join(basePath, folder, 'route.js');
    if (!fs.existsSync(routeFile)) continue;
    
    let content = fs.readFileSync(routeFile, 'utf8');
    
    // Fix the extra `});` that was left by the previous replace script.
    content = content.replace(/return name === '(.*?)';\n            \}\);\n        \}\);\n        \}\);/g, "return name === '$1';\n            });\n        });");
    
    fs.writeFileSync(routeFile, content);
}

console.log('Fixed syntax error in all route files.');
