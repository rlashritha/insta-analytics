
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { AudienceDemographics } from '../types';

interface AudienceChartProps {
    audience: AudienceDemographics;
}

const COLORS_GENDER = ['#38bdf8', '#f472b6', '#a78bfa'];
const COLORS_AGE = ['#34d399', '#facc15', '#fb923c', '#f87171', '#a78bfa'];
const COLORS_GEO = ['#22d3ee', '#60a5fa', '#a78bfa', '#e879f9', '#fb7185'];

const ChartSection: React.FC<{ title: string; data: { label: string; value: number }[]; colors: string[] }> = ({ title, data, colors }) => (
    <div className="flex-1 min-w-[280px]">
        <h4 className="text-md font-semibold text-center text-slate-300 mb-2">{title}</h4>
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="label"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                            const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                            const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                            const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                            return (
                                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                    {`${(percent * 100).toFixed(0)}%`}
                                </text>
                            );
                        }}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const AudienceChart: React.FC<AudienceChartProps> = ({ audience }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Audience Demographics</h2>
            <div className="bg-slate-800/50 p-6 rounded-2xl ring-1 ring-slate-700 flex flex-wrap gap-8 justify-center">
                <ChartSection title="Gender Distribution" data={audience.gender} colors={COLORS_GENDER} />
                <ChartSection title="Age Range" data={audience.age} colors={COLORS_AGE} />
                <ChartSection title="Top Locations" data={audience.geography} colors={COLORS_GEO} />
            </div>
        </div>
    );
};

export default AudienceChart;
