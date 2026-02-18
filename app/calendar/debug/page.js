'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState }nimport Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function CalendarDebug() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('is_published', true)
                .order('start_datetime', { ascending: true });

            if (data) {
                setEvents(data);
                analyze(data);
            }
            setLoading(false);
        };
        fetchEvents();
    }, []);

    const analyze = (allEvents) => {
        const categories = {
            'Big Events': [],
            'Civic': [],
            'Live Music': [],
            'Family': [],
            // Add others if needed
        };

        allEvents.forEach(event => {
            const cats = Array.isArray(event.categories) ? event.categories : [event.categories];

            // Big Events Logic
            const isBig = cats.some(c => (typeof c === 'string' ? c : c?.name) === 'Big Events');
            if (isBig) categories['Big Events'].push(event);

            // Civic Logic
            const isCivic = cats.some(c => (typeof c === 'string' ? c : c?.name) === 'Civic');
            if (isCivic) categories['Civic'].push(event);

            // Live Music Logic
            const isMusic = cats.some(c => (typeof c === 'string' ? c : c?.name) === 'Live Music');
            if (isMusic) categories['Live Music'].push(event);

            // Family Logic
            const isFamily = cats.some(c => (typeof c === 'string' ? c : c?.name) === 'Family');
            if (isFamily) categories['Family'].push(event);
        });

        setStats(categories);
    };

    if (loading) return <div className="p-8">Loading events...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto font-mono text-sm">
            <h1 className="text-2xl font-bold mb-4">Calendar Data Debugger</h1>
            <p className="mb-8 bg-yellow-100 p-4 rounded">
                This page shows exactly what the database has. If it's listed here, it is in the calendar feed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(stats).map(([category, items]) => (
                    <div key={category} className="border border-gray-300 p-4 rounded bg-white shadow-sm">
                        <h2 className="text-xl font-bold mb-2 flex justify-between">
                            {category}
                            <span className="bg-blue-100 px-2 rounded text-blue-800">{items.length} Events</span>
                        </h2>
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-2">Date</th>
                                        <th className="p-2">Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(e => (
                                        <tr key={e.id} className="border-b hover:bg-gray-50">
                                            <td className="p-2 whitespace-nowrap text-gray-500">
                                                {new Date(e.start_datetime).toLocaleDateString()}
                                            </td>
                                            <td className="p-2 font-medium">
                                                {e.title}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link href="/calendar/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
            </div>
        </div>
    );
}
