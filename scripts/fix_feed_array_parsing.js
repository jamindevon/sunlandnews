import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'app', 'calendars');
const folders = ['all', 'big-events', 'business', 'civic', 'date-night', 'family', 'live-music', 'outdoor', 'parent'];

const correctFilterCode = `
        const events = allEvents.filter(event => {
            if (!event.categories) return false;
            
            let cats = [];
            try {
                if (typeof event.categories === 'string') {
                    cats = JSON.parse(event.categories);
                } else if (Array.isArray(event.categories)) {
                    cats = event.categories;
                } else {
                    cats = Object.values(event.categories);
                }
            } catch (e) {
                cats = [event.categories];
            }
            
            return cats.some(c => {
                const name = typeof c === 'string' ? c : c?.name;
                return name === '__CATEGORY__';
            });
        });
`;

for (const folder of folders) {
    if (folder === 'all') {
        continue; // all has different logic, skipping
    }

    const routeFile = path.join(basePath, folder, 'route.js');
    if (!fs.existsSync(routeFile)) continue;

    let content = fs.readFileSync(routeFile, 'utf8');

    // Find the category name based on the file logic
    const categoryMatch = content.match(/return name === '(.*?)';/);
    if (!categoryMatch) continue;

    const categoryName = categoryMatch[1];
    const newCode = correctFilterCode.replace('__CATEGORY__', categoryName);

    // replace everything from `const events = allEvents.filter` to `});`
    content = content.replace(/const events = allEvents\.filter\(event => \{[\s\S]*?\}\);/, newCode.trim());

    fs.writeFileSync(routeFile, content);
}

console.log('Successfully injected universal category parsing logic.');
