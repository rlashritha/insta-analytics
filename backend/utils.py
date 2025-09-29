import random

def generate_tags():
    sample_tags = ["food", "travel", "fashion", "fitness", "luxury", "nature", "party", "tech"]
    return random.sample(sample_tags, 3)

def generate_vibe():
    return random.choice(["casual", "aesthetic", "luxury", "energetic", "cozy"])

def generate_quality():
    return random.choice(["excellent", "good", "average", "poor"])
