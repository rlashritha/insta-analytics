
import React from 'react';

interface SearchBarProps {
    username: string;
    setUsername: (username: string) => void;
    onSearch: () => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ username, setUsername, onSearch, isLoading }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-2xl mx-auto">
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    @
                </div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Instagram username..."
                    disabled={isLoading}
                    className="w-full pl-7 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 disabled:opacity-50"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                     <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                    'Get Insights'
                )}
            </button>
        </form>
    );
};

export default SearchBar;
