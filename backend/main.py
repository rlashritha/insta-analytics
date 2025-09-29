from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.scraper import generate_mock_instagram_data
from schemas import InstagramData

app = FastAPI(title="Insta Insights Dashboard Backend")

# Allow frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/scrape/{username}", response_model=InstagramData)
async def scrape(username: str):
    if not username:
        raise HTTPException(status_code=400, detail="Username is required")
    # Generate realistic mock Instagram data
    instagram_data = generate_mock_instagram_data(username)
    return instagram_data

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
