'use client';

import { useState, useMemo } from 'react';
import salaryData from '@/public/st-lucie-salaries.json';
import NewsletterPrompt from '@/app/post/[slug]/NewsletterPrompt';

const POPULAR_SEARCHES = [
    { label: 'Top Earners', query: '', org: 'ALL', sort: 'salary-desc' },
    { label: 'PSL Police', query: 'Police', org: 'Port St. Lucie', sort: 'salary-desc' },
    { label: 'Fire Rescue', query: 'Fire', org: 'St. Lucie County Fire District', sort: 'salary-desc' },
    { label: 'Principals', query: 'Principal', org: 'St. Lucie Public Schools', sort: 'salary-desc' },
    { label: 'Attorneys', query: 'Attorney', org: 'ALL', sort: 'salary-desc' },
];

const ORGS = [
    { id: 'ALL', label: 'All Agencies', count: 925 },
    { id: 'Port St. Lucie', label: 'Port St. Lucie', count: 301 },
    { id: 'St. Lucie County Fire District', label: 'Fire District', count: 259 },
    { id: 'St. Lucie Public Schools', label: 'Public Schools', count: 117 },
    { id: "St. Lucie County Sheriff's Office", label: "Sheriff's Office", count: 106 },
    { id: 'St. Lucie County', label: 'County Govt', count: 87 },
    { id: 'Fort Pierce', label: 'Fort Pierce', count: 55 }
];

const SALARY_RANGES = [
    { id: 'ALL', label: 'All $100k+' },
    { id: '200k+', label: '$200k+' },
    { id: '150k-200k', label: '$150k–$200k' },
    { id: '125k-150k', label: '$125k–$150k' },
    { id: '100k-125k', label: '$100k–$125k' }
];

const SORT_OPTIONS = [
    { id: 'salary-desc', label: 'Highest Pay' },
    { id: 'salary-asc', label: 'Lowest Pay' },
    { id: 'name-asc', label: 'Name (A–Z)' }
];

export default function SalariesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('ALL');
    const [selectedRange, setSelectedRange] = useState('ALL');
    const [sortBy, setSortBy] = useState('salary-desc');
    const [visibleCount, setVisibleCount] = useState(15);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

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

    // Handle Quick Preset
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

    // Reset Filters
    const handleReset = () => {
        setSearchTerm('');
        setSelectedOrg('ALL');
        setSelectedRange('ALL');
        setSortBy('salary-desc');
        setVisibleCount(15);
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
        <div className="min-h-screen bg-[#fffdf7] font-sans text-black py-6 sm:py-10 px-3 sm:px-6 relative selection:bg-[#ff4365] selection:text-white">
            
            <div className="max-w-2xl mx-auto relative z-10">

                {/* Clean Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-[#f9dc5c] border-2 border-black px-3 py-1 mb-2.5 rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                        <span className="font-black uppercase tracking-wider text-[11px] text-black">
                            Sunland Public Pay Database
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase mb-2">
                        St. Lucie County <span className="text-[#ff4365] underline decoration-4 underline-offset-4">Salaries</span>
                    </h1>
                    <p className="text-xs sm:text-base font-bold text-gray-700 max-w-lg mx-auto mb-3">
                        Public payroll records from local government over the past year ($100,000+ earners).
                    </p>

                    {/* Data Disclaimer Note */}
                    <div className="bg-white border border-black/20 rounded-xl p-3 text-left shadow-sm text-xs text-gray-600 font-medium leading-relaxed">
                        <strong className="text-black font-bold">Note on data:</strong> Reflects public payroll records from the past year. Personnel changes occur over time (for example, former County Administrator George Landry and Fort Pierce City Attorney Sara Hedges recently departed their roles).
                    </div>
                </div>

                {/* Search & Filter Card */}
                <div className="bg-white border-3 border-black rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-8 space-y-4">

                    {/* Search Input Box */}
                    <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                            Search Employee or Job Title
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(15); }}
                                placeholder="Search name, title, or agency..."
                                className="w-full bg-[#fffdf7] border-2 border-black rounded-xl py-3 pl-10 pr-9 text-sm sm:text-base font-bold text-black placeholder-gray-400 focus:outline-none focus:bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all min-h-[46px]"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-3 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>

                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-3 bg-black text-white rounded-full w-5 h-5 text-xs font-black flex items-center justify-center hover:bg-[#ff4365]"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Popular Search Chips */}
                    <div>
                        <div className="text-[11px] font-black uppercase text-gray-500 mb-1.5 tracking-wider">
                            Popular Searches:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {POPULAR_SEARCHES.map((preset, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePreset(preset)}
                                    className="bg-gray-100 hover:bg-[#f9dc5c] border border-black px-2.5 py-1.5 rounded-lg text-xs font-bold text-black transition-all shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]"
                                >
                                    {preset.label}
                                </button>
                            ))}

                            <button
                                onClick={handleRandomSpotlight}
                                className="bg-[#ff4365] text-white hover:bg-black border border-black px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                            >
                                Random Spotlight
                            </button>
                        </div>
                    </div>

                    {/* Agency Filter Tabs */}
                    <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-black uppercase text-black tracking-wider">Filter by Agency</span>
                            <span className="text-[10px] font-bold text-gray-400">Swipe →</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-0.5">
                            {ORGS.map((org) => {
                                const isActive = selectedOrg === org.id;
                                return (
                                    <button
                                        key={org.id}
                                        onClick={() => { setSelectedOrg(org.id); setVisibleCount(15); }}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-black border border-black whitespace-nowrap flex-shrink-0 transition-all ${isActive
                                                ? 'bg-[#f88600] text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-black hover:bg-gray-50 shadow-[1px_1px_0px_rgba(0,0,0,1)]'
                                            }`}
                                    >
                                        {org.label} <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>{org.count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Clean Sort Pills */}
                    <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black uppercase text-black tracking-wider flex-shrink-0">Sort:</span>
                            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
                                {SORT_OPTIONS.map((opt) => {
                                    const isActive = sortBy === opt.id;
                                    return (
                                        <button
                                            key={opt.id}
                                            onClick={() => setSortBy(opt.id)}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border border-black whitespace-nowrap transition-all ${isActive
                                                    ? 'bg-black text-white shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-white'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowOptions(!showOptions)}
                                className="text-xs font-black text-gray-600 hover:text-black uppercase"
                            >
                                {showOptions ? '▲ Hide Ranges' : '⚙️ Pay Ranges'}
                            </button>

                            {(searchTerm || selectedOrg !== 'ALL' || selectedRange !== 'ALL') && (
                                <button
                                    onClick={handleReset}
                                    className="text-xs font-black text-[#ff4365] underline hover:text-black uppercase"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Collapsible Pay Bracket Options */}
                    {showOptions && (
                        <div className="pt-3 border-t border-gray-200 animate-fade-in">
                            <div className="text-xs font-black uppercase text-black mb-1.5 tracking-wider">Pay Bracket</div>
                            <div className="flex flex-wrap gap-1.5">
                                {SALARY_RANGES.map((range) => {
                                    const isActive = selectedRange === range.id;
                                    return (
                                        <button
                                            key={range.id}
                                            onClick={() => setSelectedRange(range.id)}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border border-black transition-all ${isActive
                                                    ? 'bg-[#3185fc] text-white shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-white'
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* STANDARD ARTICLE NEWSLETTER PROMPT COMPONENT */}
                <div className="my-8">
                    <NewsletterPrompt />
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs font-black uppercase text-gray-600 mb-3 px-1">
                    <span>Matches: {filteredData.length} employees</span>
                    <button
                        onClick={handleDownloadCSV}
                        className="text-black hover:text-[#f88600] underline font-black text-xs"
                    >
                        Export CSV
                    </button>
                </div>

                {/* Employee Cards List */}
                {filteredData.length === 0 ? (
                    <div className="bg-white border-3 border-black rounded-2xl p-6 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-lg font-black uppercase mb-1">No Matches Found</h3>
                        <p className="text-xs font-bold text-gray-600 mb-3">Try adjusting your search term or clearing filters.</p>
                        <button
                            onClick={handleReset}
                            className="bg-[#f88600] text-white font-black uppercase px-4 py-2 rounded-xl border border-black text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        >
                            Show All Employees
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2.5 mb-8">
                        {visibleItems.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                onClick={() => setSelectedEmployee(item)}
                                className="bg-white border-2 border-black p-3.5 sm:p-4 rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-between gap-3 group"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-gray-100 border border-black text-black truncate">
                                            {item.org}
                                        </span>
                                    </div>
                                    <h3 className="font-black text-sm sm:text-base text-black group-hover:text-[#f88600] transition-colors leading-snug truncate">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs font-bold text-gray-600 truncate">{item.job}</p>
                                </div>

                                <div className="text-right flex-shrink-0">
                                    <div className="text-base sm:text-lg font-black text-black">{item.salaryFormatted}</div>
                                    <div className="text-[10px] font-bold text-gray-400">Annual Base</div>
                                </div>
                            </div>
                        ))}

                        {/* Load More Button */}
                        {visibleCount < filteredData.length && (
                            <div className="text-center pt-3">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 25)}
                                    className="bg-black text-white hover:bg-gray-800 font-black uppercase px-6 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs transition-all active:translate-x-[1px] active:translate-y-[1px]"
                                >
                                    Load More Employees ({filteredData.length - visibleCount} remaining)
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Detail Pop-up Modal */}
                {selectedEmployee && (
                    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white border-3 border-black rounded-2xl p-5 max-w-sm w-full shadow-[10px_10px_0px_rgba(0,0,0,1)] relative animate-fade-in">
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="absolute top-3.5 right-3.5 bg-black text-white font-black w-7 h-7 rounded-full border border-black flex items-center justify-center hover:bg-[#ff4365]"
                            >
                                ✕
                            </button>

                            <span className="inline-block bg-[#f9dc5c] border border-black px-2 py-0.5 text-[10px] font-black uppercase mb-2 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                                {selectedEmployee.org}
                            </span>

                            <h3 className="text-xl font-black text-black uppercase mb-0.5 leading-tight pr-5">
                                {selectedEmployee.name}
                            </h3>
                            <p className="text-xs font-bold text-gray-700 mb-3">{selectedEmployee.job}</p>

                            <div className="bg-[#fffdf7] border border-black p-3.5 rounded-xl mb-4 space-y-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-gray-600 uppercase">Annual Base Pay</span>
                                    <span className="text-xl font-black text-black">{selectedEmployee.salaryFormatted}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-gray-600 border-t border-black/10 pt-1.5">
                                    <span>Employer</span>
                                    <span className="text-black font-black">{selectedEmployee.org}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="w-full bg-black text-white font-black uppercase py-2.5 rounded-xl border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-gray-800 text-xs min-h-[42px]"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
