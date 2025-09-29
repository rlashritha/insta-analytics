
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { AnalyticsData, PostData } from '../types';

interface AnalyticsDashboardProps {
    analytics: AnalyticsData;
    posts: PostData[];
}

const AnalyticsCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg ring-1 ring-slate-700 flex-1 min-w-[200px]">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <p className="text-3xl font-bold text-sky-400 mt-1">{value}</p>
    </div>
);

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ analytics, posts }) => {
    const chartData = posts.slice(0, 10).reverse().map(post => ({
        name: new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        likes: post.likesCount,
        comments: post.commentsCount,
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
                <AnalyticsCard title="Average Likes / Post" value={analytics.averageLikes.toLocaleString()} />
                <AnalyticsCard title="Average Comments / Post" value={analytics.averageComments.toLocaleString()} />
                <AnalyticsCard title="Engagement Rate" value={`${analytics.engagementRate.toFixed(2)}%`} />
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl ring-1 ring-slate-700">
                <h3 className="text-lg font-semibold mb-4">Recent Post Performance</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    borderColor: '#334155',
                                    color: '#e2e8f0'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="likes" stroke="#38bdf8" strokeWidth={2} name="Likes" />
                            <Line type="monotone" dataKey="comments" stroke="#a78bfa" strokeWidth={2} name="Comments" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
