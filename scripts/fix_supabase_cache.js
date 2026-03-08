import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'app', 'calendars');
const folders = ['all', 'big-events', 'business', 'civic', 'date-night', 'family', 'live-music', 'outdoor', 'parent'];

for (const folder of folders) {
    const routeFile = path.join(basePath, folder, 'route.js');
    if (!fs.existsSync(routeFile)) continue;
    
    let content = fs.readFileSync(routeFile, 'utf8');
    
    // Replace standard createClient with fetch override
    const replacement = `const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        global: { fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }) }
    });`;
    
    content = content.replace(/const supabase = createClient\(supabaseUrl, supabaseServiceKey\);/g, replacement);
    
    fs.writeFileSync(routeFile, content);
}

console.log('Fixed cache on all route files.');
