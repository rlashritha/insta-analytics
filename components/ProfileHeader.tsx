
import React from 'react';
import type { ProfileData } from '../types';
import { ICONS } from '../constants';

interface ProfileHeaderProps {
    profile: ProfileData;
}

const StatItem: React.FC<{ icon: React.ReactNode, label: string; value: number }> = ({ icon, label, value }) => (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="flex items-center gap-2">
            <span className="text-sky-400">{icon}</span>
            <span className="text-2xl font-bold">{value.toLocaleString()}</span>
        </div>
        <span className="text-sm text-slate-400">{label}</span>
    </div>
);

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl ring-1 ring-slate-700">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                    src={profile.profilePictureUrl}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full ring-4 ring-slate-700 object-cover"
                />
                <div className="flex-1 flex flex-col items-center sm:items-start">
                    <h2 className="text-3xl font-bold">{profile.name}</h2>
                    <p className="text-lg text-sky-400">@{profile.username}</p>
                    <p className="mt-2 text-slate-300 text-center sm:text-left max-w-lg">{profile.bio}</p>
                </div>
                <div className="flex gap-6 sm:gap-8 justify-center sm:justify-start pt-4 sm:pt-0">
                    <StatItem icon={ICONS.POST} label="Posts" value={profile.postsCount} />
                    <StatItem icon={ICONS.FOLLOWERS} label="Followers" value={profile.followersCount} />
                    <StatItem icon={ICONS.FOLLOWING} label="Following" value={profile.followingCount} />
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
