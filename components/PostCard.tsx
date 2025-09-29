
import React from 'react';
import type { PostData } from '../types';
import Tag from './common/Tag';
import { ICONS } from '../constants';

interface PostCardProps {
    post: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="bg-slate-800/50 rounded-lg overflow-hidden ring-1 ring-slate-700 group relative">
            <img src={post.imageUrl} alt={post.caption.substring(0, 30)} className="w-full h-48 object-cover" />
            <div className="p-4">
                <p className="text-sm text-slate-300 line-clamp-2 h-10">{post.caption}</p>
                <div className="flex justify-between items-center mt-2 text-slate-400">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-sm">
                            {ICONS.HEART}
                            {post.likesCount.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm">
                            {ICONS.COMMENT}
                            {post.commentsCount.toLocaleString()}
                        </span>
                    </div>
                    <span className="text-xs">{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
            </div>
             {post.analysis && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-start">
                    <h4 className="font-bold text-sky-400">AI Analysis</h4>
                    <div className="mt-2 space-y-3 text-sm">
                        <div>
                            <p className="font-semibold text-slate-300">Vibe: <Tag color="purple">{post.analysis.vibe}</Tag></p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-300 mb-1">Tags:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {post.analysis.tags.slice(0, 3).map(tag => <Tag key={tag} color="blue">{tag}</Tag>)}
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-300 mb-1">Quality Indicators:</p>
                            <div className="flex flex-wrap gap-1.5">
                                <Tag color="green">{post.analysis.lightingQuality}</Tag>
                                <Tag color="yellow">{post.analysis.visualAppeal}</Tag>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;