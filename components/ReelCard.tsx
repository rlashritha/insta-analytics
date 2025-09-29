
import React from 'react';
import type { ReelData } from '../types';
import Tag from './common/Tag';
import { ICONS } from '../constants';

interface ReelCardProps {
    reel: ReelData;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel }) => {
    return (
        <div className="bg-slate-800/50 rounded-lg overflow-hidden ring-1 ring-slate-700 group relative flex-shrink-0 w-64">
            <img src={reel.thumbnailUrl} alt={reel.caption.substring(0, 30)} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <p className="text-sm text-white font-semibold line-clamp-2">{reel.caption}</p>
                <div className="flex items-center gap-4 mt-2 text-slate-200">
                    <span className="flex items-center gap-1.5 text-xs font-bold">{ICONS.VIEW} {reel.viewsCount.toLocaleString()}</span>
                    <span className="flex items-center gap-1.5 text-xs">{ICONS.HEART} {reel.likesCount.toLocaleString()}</span>
                    <span className="flex items-center gap-1.5 text-xs">{ICONS.COMMENT} {reel.commentsCount.toLocaleString()}</span>
                </div>
            </div>
             {reel.analysis && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-start">
                    <h4 className="font-bold text-sky-400">AI Analysis</h4>
                    <div className="mt-2 space-y-3 text-sm">
                        <div>
                            <p className="font-semibold text-slate-300">Vibe: <Tag color="pink">{reel.analysis.vibe}</Tag></p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-300 mb-1">Detected Objects:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {reel.analysis.detectedObjects.slice(0, 3).map(obj => <Tag key={obj} color="green">{obj}</Tag>)}
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-300 mb-1">Descriptive Tags:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {reel.analysis.descriptiveTags.slice(0, 3).map(tag => <Tag key={tag} color="yellow">{tag}</Tag>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReelCard;