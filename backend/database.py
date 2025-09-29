from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.insta_insights

profile_collection = database.get_collection("profiles")
posts_collection = database.get_collection("posts")
reels_collection = database.get_collection("reels")
