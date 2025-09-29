
import React from 'react';
import type { ReelData } from '../types';
import ReelCard from './ReelCard';

interface ReelsCarouselProps {
    reels: ReelData[];
}

const ReelsCarousel: React.FC<ReelsCarouselProps> = ({ reels }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Recent Reels</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mb-4">
                {reels.map(reel => (
                    <ReelCard key={reel.id} reel={reel} />
                ))}
                <div className="flex-shrink-0 w-1"></div>
            </div>
        </div>
    );
};

export default ReelsCarousel;
