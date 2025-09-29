from schemas import (
    Post, Reel, ProfileData, AnalyticsData, AudienceData, 
    InstagramData, PostAnalysis, ReelAnalysis, AudienceSegment
)
from utils import generate_tags, generate_vibe, generate_quality
import random
from datetime import datetime, timedelta

def generate_mock_instagram_data(username: str) -> InstagramData:
    # Generate realistic follower counts based on username type
    followers = random.randint(5000, 100000)
    following = random.randint(200, 3000)
    posts_count = random.randint(100, 500)
    
    # Generate posts with realistic engagement
    posts = []
    total_likes = 0
    total_comments = 0
    
    for i in range(10):
        likes = random.randint(int(followers * 0.01), int(followers * 0.08))
        comments = random.randint(int(likes * 0.02), int(likes * 0.1))
        total_likes += likes
        total_comments += comments
        
        # Generate timestamp (recent posts, descending order)
        days_ago = i * random.randint(1, 3)
        timestamp = (datetime.now() - timedelta(days=days_ago)).isoformat()
        
        posts.append(Post(
            id=f"post_{username}_{i+1}",
            imageUrl=f"https://picsum.photos/seed/{username}_post_{i+1}/600/600",
            caption=f"Amazing {username.replace('_', ' ')} content! Check out this incredible moment 📸 #{username.replace('_', '')} #lifestyle",
            likesCount=likes,
            commentsCount=comments,
            timestamp=timestamp,
            analysis=PostAnalysis(
                tags=generate_tags(),
                vibe=generate_vibe(),
                lightingQuality=generate_quality(),
                visualAppeal=random.choice(["Excellent", "Good", "Average"]),
                brandConsistency=random.choice(["Strong", "Moderate", "Weak"])
            )
        ))
    
    # Generate reels
    reels = []
    for i in range(5):
        views = random.randint(int(followers * 0.5), int(followers * 3))
        likes = random.randint(int(views * 0.02), int(views * 0.1))
        comments = random.randint(int(likes * 0.05), int(likes * 0.15))
        
        reels.append(Reel(
            id=f"reel_{username}_{i+1}",
            thumbnailUrl=f"https://picsum.photos/seed/{username}_reel_{i+1}/600/800",
            caption=f"Trending reel about {username.replace('_', ' ')}! 🔥 #reels #viral",
            viewsCount=views,
            likesCount=likes,
            commentsCount=comments,
            analysis=ReelAnalysis(
                detectedObjects=random.sample(["person", "nature", "food", "car", "building", "animal"], k=random.randint(1, 3)),
                vibe=generate_vibe(),
                descriptiveTags=generate_tags()
            )
        ))
    
    # Calculate analytics
    average_likes = total_likes // 10
    average_comments = total_comments // 10
    engagement_rate = round(((average_likes + average_comments) / followers) * 100, 2)
    
    # Generate profile data
    profile = ProfileData(
        name=f"{username.replace('_', ' ').title()}",
        username=username,
        profilePictureUrl=f"https://picsum.photos/seed/{username}_profile/200/200",
        followersCount=followers,
        followingCount=following,
        postsCount=posts_count,
        bio=f"✨ {username.replace('_', ' ').title()} ✨\n📍 Sharing amazing moments\n💌 Collaborations welcome"
    )
    
    analytics = AnalyticsData(
        averageLikes=average_likes,
        averageComments=average_comments,
        engagementRate=engagement_rate
    )
    
    # Generate audience data
    audience = AudienceData(
        gender=[
            AudienceSegment(label="Female", value=random.randint(45, 65)),
            AudienceSegment(label="Male", value=random.randint(35, 55))
        ],
        age=[
            AudienceSegment(label="18-24", value=random.randint(20, 35)),
            AudienceSegment(label="25-34", value=random.randint(25, 40)),
            AudienceSegment(label="35-44", value=random.randint(15, 30)),
            AudienceSegment(label="45+", value=random.randint(10, 25))
        ],
        geography=[
            AudienceSegment(label="United States", value=random.randint(25, 45)),
            AudienceSegment(label="United Kingdom", value=random.randint(10, 20)),
            AudienceSegment(label="Canada", value=random.randint(8, 15)),
            AudienceSegment(label="Australia", value=random.randint(5, 12)),
            AudienceSegment(label="Other", value=random.randint(15, 30))
        ]
    )
    
    return InstagramData(
        profile=profile,
        analytics=analytics,
        posts=posts,
        reels=reels,
        audience=audience
    )
