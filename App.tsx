import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ProfileHeader from './components/ProfileHeader';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PostsGrid from './components/PostsGrid';
import ReelsCarousel from './components/ReelsCarousel';
import AudienceChart from './components/AudienceChart';
import Spinner from './components/common/Spinner';
import { fetchInstagramData, checkBackendHealth } from './services/instagramService';
import type { InstagramData } from './types';

const App: React.FC = () => {
    const [username, setUsername] = useState<string>('travel.influencer');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [instaData, setInstaData] = useState<InstagramData | null>(null);
    const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

    // Check backend health on component mount
    useEffect(() => {
        const checkHealth = async () => {
            setBackendStatus('checking');
            const isHealthy = await checkBackendHealth();
            setBackendStatus(isHealthy ? 'online' : 'offline');
        };
        checkHealth();
    }, []);

    const handleSearch = useCallback(async () => {
        if (!username.trim()) {
            setError("Please enter a username.");
            return;
        }
        
        if (backendStatus === 'offline') {
            setError("Backend server is not running. Please start the backend server and try again.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setInstaData(null);

        try {
            const data = await fetchInstagramData(username);
            setInstaData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [username, backendStatus]);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
            <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                <header className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500">
                        Insta Insights Dashboard
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Enter any Instagram username to generate a comprehensive analytics report.
                    </p>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <div className={`w-2 h-2 rounded-full ${
                            backendStatus === 'checking' ? 'bg-yellow-400 animate-pulse' :
                            backendStatus === 'online' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        <span className={`text-sm ${
                            backendStatus === 'checking' ? 'text-yellow-400' :
                            backendStatus === 'online' ? 'text-green-400' : 'text-red-400'
                        }`}>
                            Backend {backendStatus === 'checking' ? 'checking...' : backendStatus}
                        </span>
                    </div>
                </header>

                <SearchBar 
                    username={username}
                    setUsername={setUsername}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                />

                {isLoading && <Spinner />}

                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                        <p><span className="font-bold">Error:</span> {error}</p>
                    </div>
                )}

                {instaData && (
                    <div className="space-y-8 animate-fade-in">
                        <ProfileHeader profile={instaData.profile} />
                        <AnalyticsDashboard analytics={instaData.analytics} posts={instaData.posts} />
                        <PostsGrid posts={instaData.posts} />
                        <ReelsCarousel reels={instaData.reels} />
                        <AudienceChart audience={instaData.audience} />
                    </div>
                )}
                 {!isLoading && !instaData && !error && (
                    <div className="text-center py-12">
                        <div className="inline-block bg-slate-800 p-8 rounded-2xl border border-slate-700">
                             <h2 className="text-2xl font-semibold text-slate-300">Ready to Dive In?</h2>
                             <p className="text-slate-400 mt-2">Enter a username above to generate an insights report.</p>
                        </div>
                    </div>
                )}
            </main>

            <footer className="text-center p-4 text-xs text-slate-500">
                <p>Backend-powered Instagram Analytics. All data is mock-generated for demonstration purposes only.</p>
            </footer>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default App;