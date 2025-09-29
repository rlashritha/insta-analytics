
import React from 'react';

interface TagProps {
    children: React.ReactNode;
    color?: 'blue' | 'green' | 'purple' | 'pink' | 'yellow';
}

const Tag: React.FC<TagProps> = ({ children, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-sky-900/50 text-sky-300 ring-sky-500/50',
        green: 'bg-emerald-900/50 text-emerald-300 ring-emerald-500/50',
        purple: 'bg-violet-900/50 text-violet-300 ring-violet-500/50',
        pink: 'bg-pink-900/50 text-pink-300 ring-pink-500/50',
        yellow: 'bg-yellow-900/50 text-yellow-300 ring-yellow-500/50',
    };

    return (
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ring-1 ring-inset ${colorClasses[color]}`}>
            {children}
        </span>
    );
};

export default Tag;
