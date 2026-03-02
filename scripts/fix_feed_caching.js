import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'app', 'calendars');
const folders = ['all', 'big-events', 'business', 'civic', 'date-night', 'family', 'live-music', 'outdoor', 'parent'];

for (const folder of folders) {
    const routeFile = path.join(basePath, folder, 'route.js');
    if (!fs.existsSync(routeFile)) continue;
    
    let content = fs.readFileSync(routeFile, 'utf8');
    
    // remove Z 
    content = content.replace(/new Date\(event\.start_datetime \+ 'Z'\)/g, 'new Date(event.start_datetime)');
    content = content.replace(/new Date\(event\.end_datetime \+ 'Z'\)/g, 'new Date(event.end_datetime)');
    
    // remove cache
    content = content.replace(/'Cache-Control': 'public, max-age=3600, s-maxage=3600'/g, "'Cache-Control': 'no-store, max-age=0'");
    
    fs.writeFileSync(routeFile, content);
}
console.log('Fixed caching and timezone logic in all route files.');
