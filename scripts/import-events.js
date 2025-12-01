import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importEvents() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Go up one level from scripts/ to root
    const filePath = path.join(__dirname, '..', 'EVENTS_TO_ADD.md');

    console.log(`Reading file from: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');

    // Split by separator
    const eventBlocks = content.split('---').map(block => block.trim()).filter(block => block.startsWith('##'));

    console.log(`Found ${eventBlocks.length} events to process...`);

    for (const block of eventBlocks) {
        const lines = block.split('\n').map(l => l.trim());
        const title = lines[0].replace('## ', '').trim();

        const getVal = (key) => {
            const line = lines.find(l => l.startsWith(`- **${key}:**`));
            return line ? line.split(`- **${key}:**`)[1].trim() : null;
        };

        const dateStr = getVal('Date');
        const timeStr = getVal('Time');
        const location = getVal('Location');
        const categoriesStr = getVal('Categories');
        const link = getVal('Link');

        // Description is multi-line, usually after "- **Description:**"
        let description = '';
        const descIndex = lines.findIndex(l => l.startsWith('- **Description:**'));
        if (descIndex !== -1) {
            description = lines.slice(descIndex + 1).join('\n').trim();
        }

        if (!dateStr || !title) {
            console.warn(`Skipping incomplete event: ${title}`);
            continue;
        }

        // Parse Date & Time
        // Assuming Date is YYYY-MM-DD
        // Time can be "5:00 PM - 7:00 PM" or "TBD"

        let startDateTime = new Date(dateStr);
        let endDateTime = new Date(dateStr);

        if (timeStr && !timeStr.toUpperCase().includes('TBD')) {
            const times = timeStr.split('-').map(t => t.trim());
            const startTime = times[0];
            const endTime = times[1];

            // Helper to parse time string "5:00 PM"
            const parseTime = (dateObj, timeString) => {
                if (!timeString) return;
                const parts = timeString.split(' ');
                if (parts.length < 2) return; // Invalid format like "TBD"

                const [time, modifier] = parts;
                let [hours, minutes] = time.split(':');

                if (!hours || !minutes) return;

                if (hours === '12') hours = '00';
                if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
                dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10));
            };

            if (startTime) parseTime(startDateTime, startTime);
            if (endTime) parseTime(endDateTime, endTime);
            else {
                // Default duration 2 hours if no end time
                endDateTime.setHours(startDateTime.getHours() + 2);
            }
        } else {
            // All day or TBD - set default times
            // Let's set 8 AM to 5 PM for TBD
            startDateTime.setHours(8, 0, 0);
            endDateTime.setHours(17, 0, 0);
        }

        // Validate dates before inserting
        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
            console.error(`Invalid date for event: ${title}. Date: ${dateStr}, Time: ${timeStr}`);
            continue;
        }

        // Parse Location
        let locationName = location;
        let locationCity = '';
        if (location && location.includes(',')) {
            const parts = location.split(',');
            locationCity = parts[parts.length - 1].trim();
            locationName = parts.slice(0, parts.length - 1).join(',').trim();
        }

        // Parse Categories
        const categories = categoriesStr ? categoriesStr.split(',').map(c => c.trim()) : [];

        const eventData = {
            title,
            description,
            start_datetime: startDateTime.toISOString(),
            end_datetime: endDateTime.toISOString(),
            location_name: locationName,
            location_city: locationCity,
            url: link,
            categories,
            is_published: true
            // source: 'manual_import' // Column does not exist
        };

        console.log(`Importing: ${title}`);

        const { error } = await supabase
            .from('events')
            .insert(eventData);

        if (error) {
            console.error(`Failed to insert ${title}:`, error.message);
        } else {
            console.log(`Successfully added: ${title}`);
        }
    }
}

importEvents().catch(console.error);
