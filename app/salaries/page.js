'use client';

import { useState, useMemo } from 'react';
import salaryData from '@/public/st-lucie-salaries.json';

const ORG_OPTIONS = [
    { id: 'ALL', label: 'All St. Lucie Entities', shortLabel: 'All Entities' },
    { id: 'Port St. Lucie', label: 'Port St. Lucie (City)', shortLabel: 'Port St. Lucie' },
    { id: 'St. Lucie County Fire District', label: 'St. Lucie County Fire District', shortLabel: 'Fire District' },
    { id: 'St. Lucie Public Schools', label: 'St. Lucie Public Schools', shortLabel: 'Public Schools' },
    { id: "St. Lucie County Sheriff's Office", label: "St. Lucie County Sheriff's Office", shortLabel: 'Sheriff' },
    { id: 'St. Lucie County', label: 'St. Lucie County (Govt)', shortLabel: 'County Govt' },
    { id: 'Fort Pierce', label: 'Fort Pierce (City)', shortLabel: 'Fort Pierce' }
];

const SALARY_RANGES = [
    { id: 'ALL', label: 'All Salaries ($100k+)' },
    { id: '200k+', label: '$200,000+' },
    { id: '150k-200k', label: '$150,000 – $200,000' },
    { id: '125k-150k', label: '$125,000 – $150,000' },
    { id: '100k-125k', label: '$100,000 – $125,000' }
];

const TOP_EARNERS = [
    {
        org: 'Port St. Lucie',
        name: 'Jesus Merejo',
        job: 'City Manager',
        salary: 321321.26,
        salaryFormatted: '$321,321.26',
        badge: 'Highest Earner in PSL'
    },
    {
        org: 'St. Lucie County',
        name: 'Katherine Barbieri',
        job: 'County Attorney',
        salary: 275000.00,
        salaryFormatted: '$275,000.00',
        badge: 'Top County Official'
    },
    {
        org: 'St. Lucie Public Schools',
        name: 'Jon Prince',
        job: 'Superintendent',
        salary: 256814.00,
        salaryFormatted: '$256,814.00',
        badge: 'Top School Official'
    },
    {
        org: "St. Lucie County Sheriff's Office",
        name: 'Richard Del Toro',
        job: 'Sheriff',
        salary: 255775.00,
        salaryFormatted: '$255,775.00',
        badge: 'Top Law Enforcement'
    },
    {
        org: 'St. Lucie County Fire District',
        name: 'Jeffery Lee',
        job: 'Fire Chief',
        salary: 246704.02,
        salaryFormatted: '$246,704.02',
        badge: 'Top Fire Rescue Official'
    },
    {
        org: 'Fort Pierce',
        name: 'Richard Chess',
        job: 'City Manager',
        salary: 220500.00,
        salaryFormatted: '$220,500.00',
        badge: 'Top Fort Pierce Official'
    }
];

export default function SalariesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('ALL');
    const [selectedRange, setSelectedRange] = useState('ALL');
    const [sortBy, setSortBy] = useState('salary-desc');
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const itemsPerPage = 25;

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
            totalPayrollFormatted: '$' + (totalPayroll / 1000000).toFixed(2) + 'M',
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
        link.setAttribute("download", `st_lucie_salaries_filtered.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white py-10 px-4 md:px-8 relative z-10">
            {/* Background Dot Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Banner */}
                <div className="text-center mb-10">
                    <div className="inline-block bg-brutalYellow border-4 border-black px-4 py-1.5 mb-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-1">
                        <span className="font-black uppercase tracking-widest text-xs md:text-sm text-black">
                            Sunland News Public Transparency Tool
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-none mb-4 uppercase">
                        St. Lucie <span className="text-[#ff4365] underline decoration-8 underline-offset-4">$100K+ Public Payroll</span> Explorer
                    </h1>
                    <p className="text-base md:text-xl font-bold bg-white border-2 border-black inline-block px-5 py-2.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl max-w-3xl">
                        Search and filter all <strong>925 government employees</strong> in Port St. Lucie, Fort Pierce, St. Lucie County, Sheriff&apos;s Office, Fire District, and Public Schools making over $100,000/year.
                    </p>
                </div>

                {/* Quick Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <div className="bg-white border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                        <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-1">Matching Earners</div>
                        <div className="text-3xl md:text-4xl font-black text-black">{metrics.totalHeadcount}</div>
                        <div className="text-xs font-bold text-gray-600 mt-1">out of 925 total</div>
                    </div>

                    <div className="bg-brutalYellow border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                        <div className="text-xs font-black uppercase tracking-wider text-black mb-1">Total $100K+ Payroll</div>
                        <div className="text-3xl md:text-4xl font-black text-black">{metrics.totalPayrollFormatted}</div>
                        <div className="text-xs font-bold text-black/70 mt-1">annual base salaries</div>
                    </div>

                    <div className="bg-brutalBlue text-white border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                        <div className="text-xs font-black uppercase tracking-wider text-white/90 mb-1">Average $100K+ Pay</div>
                        <div className="text-3xl md:text-4xl font-black text-white">{metrics.avgSalaryFormatted}</div>
                        <div className="text-xs font-bold text-white/80 mt-1">per high earner</div>
                    </div>

                    <div className="bg-brutalPink text-white border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                        <div className="text-xs font-black uppercase tracking-wider text-white/90 mb-1">Top Earner Salary</div>
                        <div className="text-3xl md:text-4xl font-black text-white">{metrics.highestSalaryFormatted}</div>
                        <div className="text-xs font-bold text-white/80 mt-1">highest in selected view</div>
                    </div>
                </div>

                {/* Top Agency Leaders Spotlight */}
                <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-[10px_10px_0px_rgba(0,0,0,1)] mb-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="inline-block bg-black text-white text-xs font-black uppercase px-3 py-1 rounded-md mb-1">
                                Agency Leaders
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide">
                                Highest Earners by St. Lucie Entity
                            </h2>
                        </div>
                        <span className="text-sm font-bold bg-gray-100 border-2 border-black px-3 py-1 rounded-lg">
                            Top 6 Leadership Roles
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {TOP_EARNERS.map((leader, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedEmployee(leader)}
                                className="bg-brutalBg border-3 border-black p-4 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer relative overflow-hidden group"
                            >
                                <div className="text-xs font-black uppercase px-2 py-0.5 rounded bg-primary text-white inline-block mb-2 border border-black">
                                    {leader.badge}
                                </div>
                                <h3 className="font-black text-lg text-black group-hover:text-[#ff4365] transition-colors leading-snug">
                                    {leader.name}
                                </h3>
                                <p className="text-xs font-bold text-gray-600 line-clamp-1">{leader.job}</p>
                                <div className="mt-3 flex items-center justify-between pt-2 border-t-2 border-black/10">
                                    <span className="text-xs font-black uppercase text-gray-500">{leader.org}</span>
                                    <span className="text-lg font-black text-black">{leader.salaryFormatted}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Filter & Search Control Panel */}
                <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-[10px_10px_0px_rgba(0,0,0,1)] mb-8 space-y-6">

                    {/* Search & Action Row */}
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                        <div className="relative flex-1">
                            <label className="block text-xs font-black uppercase text-black mb-1">Search Employee Name or Job Title</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                placeholder="Search e.g. City Manager, Sheriff, Captain, Police..."
                                className="w-full bg-white border-3 border-black rounded-xl p-3.5 pl-11 text-base font-bold text-gray-900 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all"
                            />
                            <svg className="w-5 h-5 absolute left-3.5 top-[38px] text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="flex flex-wrap gap-2 items-end">
                            <div>
                                <label className="block text-xs font-black uppercase text-black mb-1">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border-3 border-black rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer"
                                >
                                    <option value="salary-desc">Highest Salary First</option>
                                    <option value="salary-asc">Lowest Salary First</option>
                                    <option value="name-asc">Name (A – Z)</option>
                                    <option value="name-desc">Name (Z – A)</option>
                                    <option value="org-asc">Organization (A – Z)</option>
                                    <option value="job-asc">Job Title (A – Z)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase text-black mb-1">View Mode</label>
                                <div className="flex border-3 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                    <button
                                        onClick={() => setViewMode('table')}
                                        className={`px-4 py-2.5 text-xs font-black uppercase transition-colors ${viewMode === 'table' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                                    >
                                        Table
                                    </button>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`px-4 py-2.5 text-xs font-black uppercase transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                                    >
                                        Cards
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Pills - Organization */}
                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-2">Filter by Organization</label>
                        <div className="flex flex-wrap gap-2">
                            {ORG_OPTIONS.map((org) => {
                                const isActive = selectedOrg === org.id;
                                const count = org.id === 'ALL'
                                    ? salaryData.length
                                    : salaryData.filter(d => d.org === org.id).length;

                                return (
                                    <button
                                        key={org.id}
                                        onClick={() => { setSelectedOrg(org.id); setCurrentPage(1); }}
                                        className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-black border-2 border-black transition-all ${isActive
                                                ? 'bg-primary text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                                                : 'bg-white text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-gray-50'
                                            }`}
                                    >
                                        {org.shortLabel} <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-md ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filter Pills - Salary Range */}
                    <div>
                        <label className="block text-xs font-black uppercase text-black mb-2">Filter by Pay Bracket</label>
                        <div className="flex flex-wrap gap-2">
                            {SALARY_RANGES.map((range) => {
                                const isActive = selectedRange === range.id;
                                return (
                                    <button
                                        key={range.id}
                                        onClick={() => { setSelectedRange(range.id); setCurrentPage(1); }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-black transition-all ${isActive
                                                ? 'bg-brutalBlue text-white shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                                                : 'bg-gray-50 text-gray-800 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-white'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active Filters Summary & Reset */}
                    {(searchTerm || selectedOrg !== 'ALL' || selectedRange !== 'ALL') && (
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-dashed border-gray-200">
                            <div className="text-xs font-bold text-gray-600">
                                Showing {filteredData.length} records matching your filters.
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleReset}
                                    className="text-xs font-black text-[#ff4365] underline hover:text-black uppercase"
                                >
                                    Clear All Filters
                                </button>
                                <button
                                    onClick={handleDownloadCSV}
                                    className="bg-black text-white text-xs font-black uppercase px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-gray-800"
                                >
                                    Export Filtered CSV
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="bg-white border-4 border-black rounded-3xl shadow-[10px_10px_0px_rgba(0,0,0,1)] overflow-hidden mb-10">

                    {/* Table Header / Title */}
                    <div className="bg-black text-white p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide">
                                St. Lucie Salary Records
                            </h2>
                            <p className="text-xs text-gray-300 font-bold">
                                Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} employees
                            </p>
                        </div>

                        <button
                            onClick={handleDownloadCSV}
                            className="self-start sm:self-auto bg-brutalYellow text-black text-xs font-black uppercase px-4 py-2 rounded-xl border-2 border-white shadow-[3px_3px_0px_rgba(255,255,255,0.3)] hover:bg-yellow-300"
                        >
                            Download CSV ({filteredData.length})
                        </button>
                    </div>

                    {/* Empty State */}
                    {filteredData.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-5xl mb-3">🔍</div>
                            <h3 className="text-2xl font-black uppercase mb-2">No Matching Employees Found</h3>
                            <p className="text-gray-600 font-bold mb-6 max-w-md mx-auto">
                                Try adjusting your search term or clearing filters to view more records.
                            </p>
                            <button
                                onClick={handleReset}
                                className="bg-primary text-white font-black uppercase px-6 py-3 rounded-xl border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                Reset Search Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Table View */}
                            {viewMode === 'table' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 border-b-4 border-black text-xs font-black uppercase tracking-wider text-black">
                                                <th className="py-4 px-6">Rank</th>
                                                <th className="py-4 px-6">Employee Name</th>
                                                <th className="py-4 px-6">Job Title</th>
                                                <th className="py-4 px-6">Organization</th>
                                                <th className="py-4 px-6 text-right">Annual Salary</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-gray-200">
                                            {paginatedData.map((item, idx) => {
                                                const globalRank = (currentPage - 1) * itemsPerPage + idx + 1;
                                                return (
                                                    <tr
                                                        key={item.id || idx}
                                                        onClick={() => setSelectedEmployee(item)}
                                                        className="hover:bg-brutalYellow/20 cursor-pointer transition-colors font-bold text-sm"
                                                    >
                                                        <td className="py-4 px-6 font-black text-xs text-gray-400">
                                                            #{globalRank}
                                                        </td>
                                                        <td className="py-4 px-6 font-black text-black text-base">
                                                            {item.name}
                                                        </td>
                                                        <td className="py-4 px-6 text-gray-800">
                                                            {item.job}
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className="inline-block bg-gray-100 border border-black px-2.5 py-1 rounded-md text-xs font-black text-black">
                                                                {item.org}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6 text-right font-black text-base text-black">
                                                            {item.salaryFormatted}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Card Grid View */}
                            {viewMode === 'grid' && (
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {paginatedData.map((item, idx) => (
                                        <div
                                            key={item.id || idx}
                                            onClick={() => setSelectedEmployee(item)}
                                            className="bg-brutalBg border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-black uppercase bg-gray-200 border border-black px-2 py-0.5 rounded text-black">
                                                        {item.org}
                                                    </span>
                                                    <span className="text-xs font-black text-gray-400">
                                                        #{(currentPage - 1) * itemsPerPage + idx + 1}
                                                    </span>
                                                </div>
                                                <h3 className="font-black text-lg text-black mb-1">{item.name}</h3>
                                                <p className="text-xs font-bold text-gray-600 mb-4">{item.job}</p>
                                            </div>
                                            <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between">
                                                <span className="text-xs font-black text-gray-500 uppercase">Annual Base</span>
                                                <span className="text-xl font-black text-black">{item.salaryFormatted}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="bg-gray-50 border-t-4 border-black p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-xs font-black uppercase text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 text-xs font-black uppercase bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:shadow-none cursor-pointer"
                                        >
                                            First
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 text-xs font-black uppercase bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:shadow-none cursor-pointer"
                                        >
                                            Prev
                                        </button>
                                        <span className="px-3 text-sm font-black">{currentPage} / {totalPages}</span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 text-xs font-black uppercase bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:shadow-none cursor-pointer"
                                        >
                                            Next
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-2 text-xs font-black uppercase bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:shadow-none cursor-pointer"
                                        >
                                            Last
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Employee Detail Modal */}
                {selectedEmployee && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[16px_16px_0px_rgba(0,0,0,1)] relative animate-fade-in">
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="absolute top-4 right-4 bg-black text-white font-black w-9 h-9 rounded-full border-2 border-black flex items-center justify-center hover:bg-brutalPink transition-colors"
                            >
                                ✕
                            </button>

                            <div className="inline-block bg-brutalYellow border-2 border-black px-3 py-1 text-xs font-black uppercase mb-3 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                {selectedEmployee.org}
                            </div>

                            <h3 className="text-3xl font-black text-black uppercase mb-1 leading-tight">
                                {selectedEmployee.name}
                            </h3>
                            <p className="text-base font-bold text-gray-700 mb-6">{selectedEmployee.job}</p>

                            <div className="bg-brutalBg border-3 border-black p-5 rounded-2xl mb-6 space-y-3 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-gray-600 uppercase">Annual Base Pay</span>
                                    <span className="text-2xl font-black text-black">{selectedEmployee.salaryFormatted}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold text-gray-600 border-t border-black/10 pt-2">
                                    <span>Public Threshold</span>
                                    <span className="text-black font-black">$100,000+ Club Member</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="w-full bg-black text-white font-black uppercase py-3.5 rounded-xl border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-800 transition-colors"
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
