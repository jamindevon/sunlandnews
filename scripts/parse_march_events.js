import fs from 'fs';
import path from 'path';
import * as chrono from 'chrono-node';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFiles = [
    'raw_events_p1.txt',
    'raw_events_p2.txt',
    'raw_events_p3.txt',
    'raw_events_p4.txt',
    'raw_events_p5.txt',
];

const parsedEvents = [];
let currentCategory = 'Other';

function parseFile(filename) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    let currentEvent = null;
    let fallbackDateStr = 'March 2026';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Check for category headers
        if (line === 'INTERESTING' || line === 'DATE NIGHT' || line === 'MARKETS & MAKERS' || line === 'SOCIAL & COMMUNITY') {
            currentCategory = line;
            continue;
        }

        // Check for date headers (e.g. Sunday, March 1)
        if (/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|March|Select|Multiple|Ongoing)/i.test(line) && !line.includes('--') && line.length < 50) {
            fallbackDateStr = line + ' 2026'; // add year to help parsing
            continue;
        }

        // Check for event line: Title -- Description at Location. | Time | Price |
        // Sometimes location is in the description string and not followed by `at Location`.
        if (line.includes(' -- ')) {
            const parts = line.split(' -- ');
            let title = parts[0].trim();
            const rest = parts.slice(1).join(' -- ').trim();

            const pipeParts = rest.split(' | ');
            let descAndLoc = pipeParts[0] ? pipeParts[0].trim() : '';
            let timeStr = pipeParts[1] ? pipeParts[1].trim() : '';
            let priceStr = pipeParts[2] ? pipeParts[2].trim() : '';

            let description = descAndLoc;
            let location = '';

            // Try to extract location from description usually ' at [Location].'
            const atIndex = description.lastIndexOf(' at ');
            if (atIndex !== -1) {
                location = description.slice(atIndex + 4).replace(/[\.,]$/, '').trim();
                description = description.slice(0, atIndex).trim();
            }

            // Next line should be the URL: [Label](URL)
            let url = '';
            let j = i + 1;
            while (j < lines.length && !lines[j].trim()) {
                j++;
            }
            if (j < lines.length && lines[j].trim().startsWith('[')) {
                const match = lines[j].trim().match(/\[([^\]]+)\]\(([^)]+)\)/);
                if (match) {
                    url = match[2];
                }
            }

            // Parse Date
            const dateInput = `${fallbackDateStr} ${timeStr}`.trim();
            const parsedDate = chrono.parseDate(dateInput) || chrono.parseDate(fallbackDateStr);

            parsedEvents.push({
                category: currentCategory,
                title,
                description,
                location,
                date_input: dateInput,
                parsed_time: parsedDate ? parsedDate.toISOString() : null,
                price: priceStr,
                url,
                raw_time_str: timeStr
            });
        }
    }
}

inputFiles.forEach(parseFile);

fs.writeFileSync(path.join(__dirname, 'parsed_march_events.json'), JSON.stringify(parsedEvents, null, 2));

console.log(`Parsed ${parsedEvents.length} events successfully.`);
let categoryCounts = {};
parsedEvents.forEach(e => {
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
});
console.log('Category breakdown:', categoryCounts);

const nullDates = parsedEvents.filter(e => !e.parsed_time);
console.log(`Events failing date parsing: ${nullDates.length}`);
if (nullDates.length > 0) {
    console.log('Sample of failed date parsing:', nullDates.slice(0, 5).map(e => e.date_input));
}

