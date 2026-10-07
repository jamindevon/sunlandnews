'use client';

import { useState, useMemo } from 'react';
import salaryData from '@/public/st-lucie-salaries.json';

const POPULAR_SEARCHES = [
    { label: '👑 Top 10 Earners', query: '', org: 'ALL', sort: 'salary-desc' },
    { label: '🚓 PSL Police', query: 'Police', org: 'Port St. Lucie', sort: 'salary-desc' },
    { label: '🚒 Fire Chiefs & Medics', query: 'Fire', org: 'St. Lucie County Fire District', sort: 'salary-desc' },
    { label: '🏫 School Principals', query: 'Principal', org: 'St. Lucie Public Schools', sort: 'salary-desc' },
    { label: '⚖️ City Attorneys', query: 'Attorney', org: 'ALL', sort: 'salary-desc' },
];

const ORGS = [
    { id: 'ALL', label: 'All Agencies (925)' },
    { id: 'Port St. Lucie', label: 'Port St. Lucie' },
    { id: 'St. Lucie County Fire District', label: 'Fire District' },
    { id: 'St. Lucie Public Schools', label: 'Public Schools' },
    { id: "St. Lucie County Sheriff's Office", label: 'Sheriff' },
    { id: 'St. Lucie County', label: 'County Govt' },
    { id: 'Fort Pierce', label: 'Fort Pierce' }
];

export default function SalariesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('ALL');
    const [sortBy, setSortBy] = useState('salary-desc');
    const [visibleCount, setVisibleCount] = useState(15);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [selectedRange, setSelectedRange] = useState('ALL');

    // Filter and Sort Data
    const filteredData = useMemo(() => {
        return salaryData.filter((item) => {
            if (selectedOrg !== 'ALL' && item.org !== selectedOrg) return false;

            if (selectedRange === '200k+' && item.salary < 200000) return false;
            if (selectedRange === '150k-200k' && (item.salary < 150000 || item.salary >= 200000)) return false;
            if (selectedRange === '125k-150k' && (item.salary < 125000 || item.salary >= 150000)) return false;
            if (selectedRange === '100k-125k' && (item.salary < 100000 || item.salary >= 125000)) return false;

            if (searchTerm.trim() !== '') {
                const term = searchTerm.toLowerCase();
                const matchName = item.name.toLowerCase().includes(term);
                const matchJob = item.job.toLowerCase().includes(term);
                const matchOrg = item.org.toLowerCase().includes(term);
                if (!matchName && !matchJob && !matchOrg) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'salary-desc') return b.salary - a.salary;
            if (sortBy === 'salary-asc') return a.salary - b.salary;
            if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
            return 0;
        });
    }, [searchTerm, selectedOrg, selectedRange, sortBy]);

    // Handle Quick Search Preset
    const handlePreset = (preset) => {
        setSearchTerm(preset.query);
        setSelectedOrg(preset.org);
        setSortBy(preset.sort || 'salary-desc');
        setVisibleCount(15);
    };

    // Handle Random Spotlight
    const handleRandomSpotlight = () => {
        const randomIndex = Math.floor(Math.random() * salaryData.length);
        setSelectedEmployee(salaryData[randomIndex]);
    };

    // Download CSV
    const handleDownloadCSV = () => {
        const headers = ["Name", "Salary", "Organization", "Job Title"];
        const rows = filteredData.map(r => [
            `"${r.name}"`,
            `"${r.salaryFormatted}"`,
            `"${r.org}"`,
            `"${r.job}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `st_lucie_county_salaries.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const visibleItems = filteredData.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white py-8 px-4 sm:px-6 relative z-10">
            {/* Background Dot Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>

            <div className="max-w-4xl mx-auto relative z-10">

                {/* Friendly Hero Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-brutalYellow border-2 border-black px-3 py-1 mb-3 shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-full transform -rotate-1">
                        <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                        <span className="font-black uppercase tracking-wider text-xs text-black">
                            St. Lucie Public Payroll Lookup
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-none mb-3 uppercase">
                        St. Lucie County <span className="text-[#ff4365] underline decoration-4 underline-offset-4">Salaries</span>
                    </h1>
                    <p className="text-sm sm:text-base font-bold text-gray-700 max-w-xl mx-auto">
                        Who makes over <strong>$100,000/year</strong> in local government? Type a name, job title, or agency below to instantly search.
                    </p>
                </div>

                {/* Main Search Bar & Quick Taps */}
                <div className="bg-white border-3 sm:border-4 border-black rounded-3xl p-4 sm:p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-8">

                    {/* Big Prominent Search Input */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(15); }}
                            placeholder="Type a name, job title, or city..."
                            className="w-full bg-brutalBg border-3 border-black rounded-2xl py-3.5 pl-12 pr-10 text-base sm:text-lg font-black text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all min-h-[52px]"
                        />
                        <svg className="w-6 h-6 absolute left-4 top-3.5 text-black pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>

                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-3.5 bg-black text-white rounded-full w-7 h-7 text-xs font-black flex items-center justify-center hover:bg-brutalPink"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Popular Quick-Tap Filters */}
                    <div>
                        <div className="text-xs font-black uppercase text-gray-500 mb-2 tracking-wider">
                            Popular Searches:
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {POPULAR_SEARCHES.map((preset, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePreset(preset)}
                                    className="bg-gray-100 hover:bg-brutalYellow border-2 border-black px-3 py-1.5 rounded-xl text-xs font-black text-black transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]"
                                >
                                    {preset.label}
                                </button>
                            ))}

                            <button
                                onClick={handleRandomSpotlight}
                                className="bg-brutalPink text-white hover:bg-black border-2 border-black px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            >
                                🎲 Surprise Me!
                            </button>
                        </div>
                    </div>

                    {/* Agency Tabs Row */}
                    <div className="mt-5 pt-4 border-t-2 border-dashed border-gray-200">
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                            {ORGS.map((org) => {
                                const isActive = selectedOrg === org.id;
                                return (
                                    <button
                                        key={org.id}
                                        onClick={() => { setSelectedOrg(org.id); setVisibleCount(15); }}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black whitespace-nowrap transition-all flex-shrink-0 ${isActive
                                                ? 'bg-primary text-white shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-gray-800 shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:bg-gray-50'
                                            }`}
                                    >
                                        {org.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Optional Toggle for More Filters & Sort */}
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            className="text-xs font-black uppercase text-gray-600 hover:text-black flex items-center gap-1"
                        >
                            <span>{showAdvancedFilters ? '▲ Hide Extra Filters' : '⚙️ More Options (Sort & Pay Ranges)'}</span>
                        </button>

                        {(searchTerm || selectedOrg !== 'ALL' || selectedRange !== 'ALL') && (
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedOrg('ALL'); setSelectedRange('ALL'); setSortBy('salary-desc'); }}
                                className="text-xs font-black text-[#ff4365] underline hover:text-black uppercase"
                            >
                                Reset Search
                            </button>
                        )}
                    </div>

                    {/* Collapsible Advanced Filters Panel */}
                    {showAdvancedFilters && (
                        <div className="mt-4 pt-4 border-t-2 border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                            <div>
                                <label className="block text-xs font-black uppercase text-black mb-1">Sort Results</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-white border-2 border-black rounded-xl p-2.5 text-xs font-bold text-gray-900 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                    <option value="salary-desc">Highest Pay First</option>
                                    <option value="salary-asc">Lowest Pay First</option>
                                    <option value="name-asc">Name (A – Z)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase text-black mb-1">Salary Range</label>
                                <select
                                    value={selectedRange}
                                    onChange={(e) => setSelectedRange(e.target.value)}
                                    className="w-full bg-white border-2 border-black rounded-xl p-2.5 text-xs font-bold text-gray-900 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                    <option value="ALL">All $100k+ Earners</option>
                                    <option value="200k+">$200,000+</option>
                                    <option value="150k-200k">$150,000 – $200,000</option>
                                    <option value="125k-150k">$125,000 – $150,000</option>
                                    <option value="100k-125k">$100,000 – $125,000</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs font-black uppercase text-gray-600 mb-4 px-1">
                    <span>Showing {visibleItems.length} of {filteredData.length} matches</span>
                    <button
                        onClick={handleDownloadCSV}
                        className="text-black hover:text-primary underline text-xs font-black"
                    >
                        Export Data (CSV)
                    </button>
                </div>

                {/* Simple Results List */}
                {filteredData.length === 0 ? (
                    <div className="bg-white border-3 border-black rounded-3xl p-8 text-center shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                        <div className="text-4xl mb-2">🔎</div>
                        <h3 className="text-xl font-black uppercase mb-1">No Employees Found</h3>
                        <p className="text-xs font-bold text-gray-600 mb-4">Try typing a different name, title, or clearing your search.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedOrg('ALL'); setSelectedRange('ALL'); }}
                            className="bg-primary text-white font-black uppercase px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-xs"
                        >
                            Show All Employees
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3 mb-8">
                        {visibleItems.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                onClick={() => setSelectedEmployee(item)}
                                className="bg-white border-3 border-black p-4 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-between gap-3 group"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-gray-100 border border-black text-black truncate max-w-[180px]">
                                            {item.org}
                                        </span>
                                    </div>
                                    <h3 className="font-black text-base sm:text-lg text-black group-hover:text-primary transition-colors leading-tight truncate">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs font-bold text-gray-600 truncate">{item.job}</p>
                                </div>

                                <div className="text-right flex-shrink-0">
                                    <div className="text-lg sm:text-xl font-black text-black">{item.salaryFormatted}</div>
                                    <div className="text-[10px] font-bold text-gray-400">Annual Base</div>
                                </div>
                            </div>
                        ))}

                        {/* Load More Button */}
                        {visibleCount < filteredData.length && (
                            <div className="text-center pt-4">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 25)}
                                    className="bg-black text-white hover:bg-gray-800 font-black uppercase px-8 py-3.5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-sm transition-all active:translate-x-[2px] active:translate-y-[2px]"
                                >
                                    Load More Employees ({filteredData.length - visibleCount} left)
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Detail Modal */}
                {selectedEmployee && (
                    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white border-4 border-black rounded-3xl p-6 max-w-md w-full shadow-[12px_12px_0px_rgba(0,0,0,1)] relative animate-fade-in">
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="absolute top-4 right-4 bg-black text-white font-black w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-brutalPink"
                            >
                                ✕
                            </button>

                            <span className="inline-block bg-brutalYellow border-2 border-black px-2.5 py-0.5 text-xs font-black uppercase mb-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                {selectedEmployee.org}
                            </span>

                            <h3 className="text-2xl font-black text-black uppercase mb-1 leading-tight pr-6">
                                {selectedEmployee.name}
                            </h3>
                            <p className="text-sm font-bold text-gray-700 mb-4">{selectedEmployee.job}</p>

                            <div className="bg-brutalBg border-2 border-black p-4 rounded-xl mb-5 space-y-2 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-gray-600 uppercase">Annual Base Pay</span>
                                    <span className="text-2xl font-black text-black">{selectedEmployee.salaryFormatted}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-bold text-gray-600 border-t border-black/10 pt-2">
                                    <span>Employer</span>
                                    <span className="text-black font-black">{selectedEmployee.org}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="w-full bg-black text-white font-black uppercase py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-800"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
