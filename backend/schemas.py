from pydantic import BaseModel
from typing import List

class PostAnalysis(BaseModel):
    tags: List[str]
    vibe: str
    lightingQuality: str
    visualAppeal: str
    brandConsistency: str

class Post(BaseModel):
    id: str
    imageUrl: str
    caption: str
    likesCount: int
    commentsCount: int
    timestamp: str
    analysis: PostAnalysis

class ReelAnalysis(BaseModel):
    detectedObjects: List[str]
    vibe: str
    descriptiveTags: List[str]

class Reel(BaseModel):
    id: str
    thumbnailUrl: str
    caption: str
    viewsCount: int
    likesCount: int
    commentsCount: int
    analysis: ReelAnalysis

class ProfileData(BaseModel):
    name: str
    username: str
    profilePictureUrl: str
    followersCount: int
    followingCount: int
    postsCount: int
    bio: str

class AnalyticsData(BaseModel):
    averageLikes: int
    averageComments: int
    engagementRate: float

class AudienceSegment(BaseModel):
    label: str
    value: int

class AudienceData(BaseModel):
    gender: List[AudienceSegment]
    age: List[AudienceSegment]
    geography: List[AudienceSegment]

class InstagramData(BaseModel):
    profile: ProfileData
    analytics: AnalyticsData
    posts: List[Post]
    reels: List[Reel]
    audience: AudienceData
