'use client';

import { useState, useMemo, useEffect } from 'react';
import salaryData from '@/public/st-lucie-salaries.json';

const ORG_OPTIONS = [
    { id: 'ALL', label: 'All Entities', shortLabel: 'All Entities' },
    { id: 'Port St. Lucie', label: 'Port St. Lucie', shortLabel: 'Port St. Lucie' },
    { id: 'St. Lucie County Fire District', label: 'Fire District', shortLabel: 'Fire District' },
    { id: 'St. Lucie Public Schools', label: 'Public Schools', shortLabel: 'Public Schools' },
    { id: "St. Lucie County Sheriff's Office", label: "Sheriff's Office", shortLabel: 'Sheriff' },
    { id: 'St. Lucie County', label: 'County Govt', shortLabel: 'County Govt' },
    { id: 'Fort Pierce', label: 'Fort Pierce', shortLabel: 'Fort Pierce' }
];

const SALARY_RANGES = [
    { id: 'ALL', label: 'All ($100k+)' },
    { id: '200k+', label: '$200k+' },
    { id: '150k-200k', label: '$150k – $200k' },
    { id: '125k-150k', label: '$125k – $150k' },
    { id: '100k-125k', label: '$100k – $125k' }
];

const TOP_EARNERS = [
    {
        org: 'Port St. Lucie',
        name: 'Jesus Merejo',
        job: 'City Manager',
        salary: 321321.26,
        salaryFormatted: '$321,321.26',
        badge: 'PSL City Manager'
    },
    {
        org: 'St. Lucie County',
        name: 'Katherine Barbieri',
        job: 'County Attorney',
        salary: 275000.00,
        salaryFormatted: '$275,000.00',
        badge: 'County Attorney'
    },
    {
        org: 'St. Lucie Public Schools',
        name: 'Jon Prince',
        job: 'Superintendent',
        salary: 256814.00,
        salaryFormatted: '$256,814.00',
        badge: 'Schools Superintendent'
    },
    {
        org: "St. Lucie County Sheriff's Office",
        name: 'Richard Del Toro',
        job: 'Sheriff',
        salary: 255775.00,
        salaryFormatted: '$255,775.00',
        badge: 'Sheriff'
    },
    {
        org: 'St. Lucie County Fire District',
        name: 'Jeffery Lee',
        job: 'Fire Chief',
        salary: 246704.02,
        salaryFormatted: '$246,704.02',
        badge: 'Fire Chief'
    },
    {
        org: 'Fort Pierce',
        name: 'Richard Chess',
        job: 'City Manager',
        salary: 220500.00,
        salaryFormatted: '$220,500.00',
        badge: 'Fort Pierce City Manager'
    }
];

export default function SalariesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('ALL');
    const [selectedRange, setSelectedRange] = useState('ALL');
    const [sortBy, setSortBy] = useState('salary-desc');
    const [viewMode, setViewMode] = useState('grid'); // Default to grid on mobile
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const itemsPerPage = 20;

    // Detect screen width to set intelligent default view
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            setViewMode('table');
        }
    }, []);

    // Filter and Sort Data
    const filteredData = useMemo(() => {
        return salaryData.filter((item) => {
            // Org Filter
            if (selectedOrg !== 'ALL' && item.org !== selectedOrg) {
                return false;
            }

            // Salary Range Filter
            if (selectedRange === '200k+' && item.salary < 200000) return false;
            if (selectedRange === '150k-200k' && (item.salary < 150000 || item.salary >= 200000)) return false;
            if (selectedRange === '125k-150k' && (item.salary < 125000 || item.salary >= 150000)) return false;
            if (selectedRange === '100k-125k' && (item.salary < 100000 || item.salary >= 125000)) return false;

            // Search Term
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
            if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
            if (sortBy === 'org-asc') return a.org.localeCompare(b.org);
            if (sortBy === 'job-asc') return a.job.localeCompare(b.job);
            return 0;
        });
    }, [searchTerm, selectedOrg, selectedRange, sortBy]);

    // Calculate Summary Metrics
    const metrics = useMemo(() => {
        const totalHeadcount = filteredData.length;
        const totalPayroll = filteredData.reduce((acc, curr) => acc + curr.salary, 0);
        const avgSalary = totalHeadcount > 0 ? totalPayroll / totalHeadcount : 0;
        const highestSalary = totalHeadcount > 0 ? Math.max(...filteredData.map(d => d.salary)) : 0;

        return {
            totalHeadcount,
            totalPayrollFormatted: '$' + (totalPayroll / 1000000).toFixed(1) + 'M',
            avgSalaryFormatted: '$' + Math.round(avgSalary).toLocaleString('en-US'),
            highestSalaryFormatted: '$' + Math.round(highestSalary).toLocaleString('en-US')
        };
    }, [filteredData]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage]);

    // Handle Reset
    const handleReset = () => {
        setSearchTerm('');
        setSelectedOrg('ALL');
        setSelectedRange('ALL');
        setSortBy('salary-desc');
        setCurrentPage(1);
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

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white py-6 md:py-10 px-3 sm:px-6 relative z-10">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header Banner */}
                <div className="text-center mb-6 md:mb-10">
                    <div className="inline-block bg-brutalYellow border-2 md:border-3 border-black px-3 py-1 mb-3 shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-lg transform -rotate-1">
                        <span className="font-black uppercase tracking-wider text-[11px] md:text-xs text-black">
                            Sunland News Public Pay Database
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-black tracking-tight leading-tight mb-3 uppercase">
                        St. Lucie County <span className="text-[#ff4365] underline decoration-4 md:decoration-8 underline-offset-4">Salaries</span>
                    </h1>
                    <p className="text-sm md:text-lg font-bold bg-white border-2 border-black inline-block px-4 py-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-xl max-w-2xl text-gray-800">
                        Search and filter public employees earning over $100,000 across Port St. Lucie, Fort Pierce, St. Lucie County, Sheriff&apos;s Office, Fire District, and Public Schools.
                    </p>
                </div>

                {/* Mobile-Optimized Quick Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 md:mb-10">
                    <div className="bg-white border-3 border-black p-3.5 sm:p-5 rounded-xl md:rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-0.5">Matching</div>
                        <div className="text-2xl sm:text-3xl font-black text-black">{metrics.totalHeadcount}</div>
                        <div className="text-[10px] sm:text-xs font-bold text-gray-500">out of 925 earners</div>
                    </div>

                    <div className="bg-brutalYellow border-3 border-black p-3.5 sm:p-5 rounded-xl md:rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black mb-0.5">Total Payroll</div>
                        <div className="text-2xl sm:text-3xl font-black text-black">{metrics.totalPayrollFormatted}</div>
                        <div className="text-[10px] sm:text-xs font-bold text-black/70">annual base</div>
                    </div>

                    <div className="bg-brutalBlue text-white border-3 border-black p-3.5 sm:p-5 rounded-xl md:rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/90 mb-0.5">Average Pay</div>
                        <div className="text-2xl sm:text-3xl font-black text-white">{metrics.avgSalaryFormatted}</div>
                        <div className="text-[10px] sm:text-xs font-bold text-white/80">per earner</div>
                    </div>

                    <div className="bg-brutalPink text-white border-3 border-black p-3.5 sm:p-5 rounded-xl md:rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/90 mb-0.5">Top Salary</div>
                        <div className="text-2xl sm:text-3xl font-black text-white">{metrics.highestSalaryFormatted}</div>
                        <div className="text-[10px] sm:text-xs font-bold text-white/80">in filter view</div>
                    </div>
                </div>

                {/* Top Agency Leaders Spotlight */}
                <div className="bg-white border-3 md:border-4 border-black rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] mb-6 md:mb-10">
                    <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
                        <div>
                            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 rounded">
                                Agency Leaders
                            </span>
                            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-wide mt-1">
                                Top Earners by Jurisdiction
                            </h2>
                        </div>
                    </div>

                    {/* Touch-Friendly Swipeable / Scrollable Row on Mobile */}
                    <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
                        {TOP_EARNERS.map((leader, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedEmployee(leader)}
                                className="min-w-[240px] sm:min-w-0 bg-brutalBg border-2 sm:border-3 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex-shrink-0 sm:flex-shrink"
                            >
                                <div className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-primary text-white inline-block mb-1.5 border border-black">
                                    {leader.badge}
                                </div>
                                <h3 className="font-black text-base text-black leading-snug">
                                    {leader.name}
                                </h3>
                                <p className="text-xs font-bold text-gray-600 truncate">{leader.job}</p>
                                <div className="mt-2.5 flex items-center justify-between pt-1.5 border-t border-black/10">
                                    <span className="text-[11px] font-black uppercase text-gray-500">{leader.org}</span>
                                    <span className="text-base font-black text-black">{leader.salaryFormatted}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Search & Filter Control Panel */}
                <div className="bg-white border-3 md:border-4 border-black rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] mb-6 space-y-4 md:space-y-5">

                    {/* Search Input Bar */}
                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-1">Search Employee or Job Title</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                placeholder="Search e.g. Manager, Sheriff, Captain, Principal..."
                                className="w-full bg-white border-2 md:border-3 border-black rounded-xl p-3 pr-10 pl-10 text-sm md:text-base font-bold text-gray-900 focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all min-h-[44px]"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>

                            {searchTerm && (
                                <button
                                    onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                                    className="absolute right-3 top-2.5 bg-gray-200 border border-black rounded-full w-6 h-6 text-xs font-black flex items-center justify-center text-gray-700 hover:bg-gray-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Horizontal Scrollable Filter - Organization */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-black uppercase text-black">Organization Filter</label>
                            <span className="text-[10px] font-bold text-gray-500 sm:hidden">Swipe →</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1.5 -mx-1 px-1">
                            {ORG_OPTIONS.map((org) => {
                                const isActive = selectedOrg === org.id;
                                const count = org.id === 'ALL'
                                    ? salaryData.length
                                    : salaryData.filter(d => d.org === org.id).length;

                                return (
                                    <button
                                        key={org.id}
                                        onClick={() => { setSelectedOrg(org.id); setCurrentPage(1); }}
                                        className={`px-3 py-2 rounded-xl text-xs font-black border-2 border-black whitespace-nowrap flex-shrink-0 transition-all min-h-[40px] flex items-center gap-1.5 ${isActive
                                                ? 'bg-primary text-white shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-gray-50'
                                            }`}
                                    >
                                        <span>{org.shortLabel}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Horizontal Scrollable Filter - Pay Bracket */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-black uppercase text-black">Pay Bracket</label>
                            <span className="text-[10px] font-bold text-gray-500 sm:hidden">Swipe →</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
                            {SALARY_RANGES.map((range) => {
                                const isActive = selectedRange === range.id;
                                return (
                                    <button
                                        key={range.id}
                                        onClick={() => { setSelectedRange(range.id); setCurrentPage(1); }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-black whitespace-nowrap flex-shrink-0 transition-all ${isActive
                                                ? 'bg-brutalBlue text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                                                : 'bg-gray-50 text-gray-800 shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:bg-white'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Controls Row: Sort & View Toggle */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-2 border-t border-gray-200">
                        <div className="flex items-center justify-between sm:justify-start gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black uppercase text-black">Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border-2 border-black rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-900 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                                >
                                    <option value="salary-desc">Highest Pay</option>
                                    <option value="salary-asc">Lowest Pay</option>
                                    <option value="name-asc">Name (A – Z)</option>
                                    <option value="name-desc">Name (Z – A)</option>
                                    <option value="org-asc">Agency (A – Z)</option>
                                    <option value="job-asc">Job Title (A – Z)</option>
                                </select>
                            </div>

                            <div className="flex border-2 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 py-1 text-xs font-black uppercase transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black'}`}
                                >
                                    Cards
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`px-3 py-1 text-xs font-black uppercase transition-colors ${viewMode === 'table' ? 'bg-black text-white' : 'bg-white text-black'}`}
                                >
                                    Table
                                </button>
                            </div>
                        </div>

                        {(searchTerm || selectedOrg !== 'ALL' || selectedRange !== 'ALL') && (
                            <button
                                onClick={handleReset}
                                className="text-xs font-black text-[#ff4365] underline hover:text-black uppercase self-end sm:self-auto"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Section */}
                <div className="bg-white border-3 md:border-4 border-black rounded-2xl md:rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden mb-8">

                    {/* Table Header Bar */}
                    <div className="bg-black text-white p-3.5 sm:p-5 flex items-center justify-between gap-2">
                        <div>
                            <h2 className="text-base sm:text-xl font-black uppercase tracking-wide">
                                St. Lucie Employee Records
                            </h2>
                            <p className="text-[11px] text-gray-300 font-bold">
                                {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
                            </p>
                        </div>

                        <button
                            onClick={handleDownloadCSV}
                            className="bg-brutalYellow text-black text-xs font-black uppercase px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-2 border-white hover:bg-yellow-300 shadow-[2px_2px_0px_rgba(255,255,255,0.2)]"
                        >
                            Export CSV
                        </button>
                    </div>

                    {/* Empty State */}
                    {filteredData.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="text-4xl mb-2">🔍</div>
                            <h3 className="text-xl font-black uppercase mb-1">No Matching Employees</h3>
                            <p className="text-xs text-gray-600 font-bold mb-4">
                                Try adjusting your search term or filters.
                            </p>
                            <button
                                onClick={handleReset}
                                className="bg-primary text-white font-black uppercase px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs"
                            >
                                Clear Search Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Card Grid View (Mobile Optimized Default) */}
                            {viewMode === 'grid' && (
                                <div className="p-3 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {paginatedData.map((item, idx) => (
                                        <div
                                            key={item.id || idx}
                                            onClick={() => setSelectedEmployee(item)}
                                            className="bg-brutalBg border-2 sm:border-3 border-black p-4 rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-[10px] font-black uppercase bg-gray-200 border border-black px-2 py-0.5 rounded text-black truncate max-w-[80%]">
                                                        {item.org}
                                                    </span>
                                                    <span className="text-[10px] font-black text-gray-400">
                                                        #{(currentPage - 1) * itemsPerPage + idx + 1}
                                                    </span>
                                                </div>
                                                <h3 className="font-black text-base text-black mb-0.5 leading-snug">{item.name}</h3>
                                                <p className="text-xs font-bold text-gray-600 mb-3">{item.job}</p>
                                            </div>
                                            <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                                                <span className="text-[10px] font-black text-gray-500 uppercase">Annual Base</span>
                                                <span className="text-lg font-black text-black">{item.salaryFormatted}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Table View */}
                            {viewMode === 'table' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 border-b-3 border-black text-[11px] font-black uppercase tracking-wider text-black">
                                                <th className="py-3 px-4">Rank</th>
                                                <th className="py-3 px-4">Name</th>
                                                <th className="py-3 px-4">Job Title</th>
                                                <th className="py-3 px-4">Organization</th>
                                                <th className="py-3 px-4 text-right">Annual Salary</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y border-black/10">
                                            {paginatedData.map((item, idx) => {
                                                const globalRank = (currentPage - 1) * itemsPerPage + idx + 1;
                                                return (
                                                    <tr
                                                        key={item.id || idx}
                                                        onClick={() => setSelectedEmployee(item)}
                                                        className="hover:bg-brutalYellow/20 cursor-pointer transition-colors font-bold text-xs sm:text-sm"
                                                    >
                                                        <td className="py-3 px-4 font-black text-gray-400 text-xs">
                                                            #{globalRank}
                                                        </td>
                                                        <td className="py-3 px-4 font-black text-black">
                                                            {item.name}
                                                        </td>
                                                        <td className="py-3 px-4 text-gray-700">
                                                            {item.job}
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <span className="inline-block bg-gray-100 border border-black px-2 py-0.5 rounded text-[11px] font-black text-black">
                                                                {item.org}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-right font-black text-black text-sm sm:text-base">
                                                            {item.salaryFormatted}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Touch-Friendly Mobile Pagination */}
                            {totalPages > 1 && (
                                <div className="bg-gray-50 border-t-3 border-black p-3.5 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <div className="text-xs font-black uppercase text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="px-2.5 py-2 text-xs font-black uppercase bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-40 min-h-[38px]"
                                        >
                                            «
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3.5 py-2 text-xs font-black uppercase bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-40 min-h-[38px]"
                                        >
                                            Prev
                                        </button>
                                        <span className="px-2 text-xs font-black">{currentPage} / {totalPages}</span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3.5 py-2 text-xs font-black uppercase bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-40 min-h-[38px]"
                                        >
                                            Next
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="px-2.5 py-2 text-xs font-black uppercase bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-40 min-h-[38px]"
                                        >
                                            »
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Employee Detail Modal */}
                {selectedEmployee && (
                    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <div className="bg-white border-t-4 sm:border-4 border-black rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-[12px_12px_0px_rgba(0,0,0,1)] relative animate-slide-up">
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="absolute top-4 right-4 bg-black text-white font-black w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-brutalPink transition-colors"
                            >
                                ✕
                            </button>

                            <div className="inline-block bg-brutalYellow border-2 border-black px-2.5 py-0.5 text-[11px] font-black uppercase mb-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                {selectedEmployee.org}
                            </div>

                            <h3 className="text-2xl font-black text-black uppercase mb-1 leading-tight pr-6">
                                {selectedEmployee.name}
                            </h3>
                            <p className="text-sm font-bold text-gray-700 mb-4">{selectedEmployee.job}</p>

                            <div className="bg-brutalBg border-2 border-black p-4 rounded-xl mb-5 space-y-2.5 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-gray-600 uppercase">Annual Base Pay</span>
                                    <span className="text-xl font-black text-black">{selectedEmployee.salaryFormatted}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-bold text-gray-600 border-t border-black/10 pt-2">
                                    <span>Threshold</span>
                                    <span className="text-black font-black">$100,000+ Public Employee</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="w-full bg-black text-white font-black uppercase py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-800 transition-colors min-h-[44px]"
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
