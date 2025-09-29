export interface ProfileData {
  name: string;
  username: string;
  profilePictureUrl: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  bio: string;
}

export interface AnalyticsData {
  averageLikes: number;
  averageComments: number;
  engagementRate: number;
}

export interface PostAnalysis {
  tags: string[];
  vibe: string;
  lightingQuality: string;
  visualAppeal: string;
  brandConsistency: string;
}

export interface PostData {
  id: string;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  analysis: PostAnalysis;
}

export interface ReelAnalysis {
  detectedObjects: string[];
  vibe: string;
  descriptiveTags: string[];
}

export interface ReelData {
  id: string;
  thumbnailUrl: string;
  caption: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  analysis: ReelAnalysis;
}

export interface AudienceDemographics {
  gender: { label: string; value: number }[];
  age: { label: string; value: number }[];
  geography: { label: string; value: number }[];
}

export interface InstagramData {
  profile: ProfileData;
  analytics: AnalyticsData;
  posts: PostData[];
  reels: ReelData[];
  audience: AudienceDemographics;
}