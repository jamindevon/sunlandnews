import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import * as chrono from 'chrono-node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const dbEvents = [];

function parseLibraryEvents() {
    const raw = fs.readFileSync(join(__dirname, 'raw_library.txt'), 'utf-8');
    const lines = raw.split('\n').filter(l => l.trim().length > 0);

    let currentDayStr = 'March 1 2026';
    for (let line of lines) {
        line = line.trim();
        if (/^\d+$/.test(line)) {
            currentDayStr = `March ${line} 2026`;
            continue;
        }

        const match = line.match(/^(\d{1,2}:\d{2}\s*[APM]+)\s+(.*?)\s+@\s+(.*)$/i);
        if (match) {
            const timeStr = match[1];
            const title = match[2].trim();
            const location = match[3].trim();

            const startStr = `${currentDayStr} ${timeStr}`;
            const start = chrono.parseDate(startStr);
            if (start) {
                const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
                dbEvents.push({
                    title: `Library: ${title}`,
                    description: `St. Lucie County Library Event - ${title}`,
                    start_datetime: start.toISOString(),
                    end_datetime: end.toISOString(),
                    location_name: location,
                    location_city: "St. Lucie County",
                    categories: ["Parent"],
                    is_published: true
                });
            }
        }
    }
}

function parsePslCivic() {
    const raw = fs.readFileSync(join(__dirname, 'raw_psl_civic.txt'), 'utf-8');
    const lines = raw.split('\n').filter(l => l.trim().length > 0);

    for (let line of lines) {
        const parsedResults = chrono.parse(line);
        if (parsedResults.length === 0) continue;

        const dateObj = parsedResults[0];
        const dateText = dateObj.text;

        const rawEventsText = line.substring(dateObj.index + dateText.length).replace(/^,?\s*/, '');
        const events = rawEventsText.split('|').map(x => x.trim()).filter(x => x);

        for (let evtTitle of events) {
            let start = dateObj.start.date();
            // If text contains a time like "1 PM", we might need to rely on chrono, which it usually picks up.
            // Let's check if there's a specific time mentioned in the text itself
            const specificTimeObj = chrono.parseDate(evtTitle, dateObj.start.date());
            if (specificTimeObj) {
                start = specificTimeObj;
            } else if (start.getHours() === 12 && !dateText.toLowerCase().includes('12')) {
                start.setHours(9, 0, 0, 0); // fallback to 9am
            }

            const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
            dbEvents.push({
                title: evtTitle,
                description: `City of PSL Meeting: ${evtTitle}`,
                start_datetime: start.toISOString(),
                end_datetime: end.toISOString(),
                location_name: "PSL City Hall",
                location_city: "Port St. Lucie",
                categories: ["Civic"],
                is_published: true
            });
        }
    }
}

function parseParks() {
    const raw = fs.readFileSync(join(__dirname, 'raw_parks_rec.txt'), 'utf-8');
    const lines = raw.split('\n').filter(l => l.trim().length > 0);

    for (let line of lines) {
        const firstSpaceIdx = line.indexOf(' ');
        if (firstSpaceIdx === -1) continue;

        const day = line.substring(0, firstSpaceIdx).trim();
        const restOfLine = line.substring(firstSpaceIdx).trim();
        const currentDayStr = `March ${day} 2026`;

        const events = restOfLine.split('|').map(x => x.trim()).filter(x => x);
        for (let evt of events) {
            // "10:30 AM Feeding Frenzy Tours"
            const match = evt.match(/^(\d{1,2}:\d{2}\s*[APMapm]+)\s+(.*)$/);
            if (match) {
                const timeStr = match[1];
                const title = match[2];
                const startStr = `${currentDayStr} ${timeStr}`;
                const start = chrono.parseDate(startStr);

                if (start) {
                    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
                    let category = "Family";
                    if (title.toLowerCase().includes("mets") || title.toLowerCase().includes("fair") || title.toLowerCase().includes("powwow")) {
                        category = "Big Events";
                    }

                    dbEvents.push({
                        title: title,
                        description: `St. Lucie County Parks & Recreation: ${title}`,
                        start_datetime: start.toISOString(),
                        end_datetime: end.toISOString(),
                        location_name: "St. Lucie County",
                        location_city: "St. Lucie County",
                        categories: [category],
                        is_published: true
                    });
                }
            }
        }
    }
}

function parseBocc() {
    const raw = fs.readFileSync(join(__dirname, 'raw_bocc.txt'), 'utf-8');
    const lines = raw.split('\n').filter(l => l.trim().length > 0);

    for (let line of lines) {
        const parsedResults = chrono.parse(line);
        if (parsedResults.length === 0) continue;

        const dateObj = parsedResults[0];
        const dateText = dateObj.text;

        const title = line.substring(dateObj.index + dateText.length).replace(/^,?\s*/, '').trim();
        const start = dateObj.start.date();
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

        dbEvents.push({
            title: title,
            description: `St. Lucie County Board of Commissioners: ${title}`,
            start_datetime: start.toISOString(),
            end_datetime: end.toISOString(),
            location_name: "SLC Administration Building",
            location_city: "Fort Pierce",
            categories: ["Civic"],
            is_published: true
        });
    }
}

async function insertAll() {
    console.log("Parsing Library Events...");
    parseLibraryEvents();
    console.log("Parsing PSL Civic Events...");
    parsePslCivic();
    console.log("Parsing Parks & Rec Events...");
    parseParks();
    console.log("Parsing BOCC Events...");
    parseBocc();

    console.log(`Parsed total of ${dbEvents.length} events!`);

    const CHUNK_SIZE = 50;
    for (let i = 0; i < dbEvents.length; i += CHUNK_SIZE) {
        const chunk = dbEvents.slice(i, i + CHUNK_SIZE);
        const { data, error } = await supabase.from('events').insert(chunk).select('id');
        if (error) {
            console.error(`Error inserting chunk ${i / CHUNK_SIZE}:`, error);
        } else {
            console.log(`Successfully inserted chunk ${i / CHUNK_SIZE} (${chunk.length} events)`);
        }
    }
}

insertAll();
