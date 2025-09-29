
import React from 'react';
import type { PostData } from '../types';
import PostCard from './PostCard';

interface PostsGridProps {
    posts: PostData[];
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default PostsGrid;
