import { GoogleGenAI, Type } from "@google/genai";
import type { InstagramData } from '../types';

const ai = new GoogleGenAI({
    apiKey: "AIzaSyCqY-7DBH3Ym-JMe1dtEHBaLJtxmczv67Y",
});

function cleanJson(jsonString: string): string {
    // Remove markdown backticks and 'json' identifier
    let cleaned = jsonString.replace(/```json/g, '').replace(/```/g, '');
    // Trim whitespace
    return cleaned.trim();
}

export const fetchInstagramData = async (username: string): Promise<InstagramData> => {
    console.log(`Generating AI data for: ${username}`);
    
    const prompt = `
Generate a realistic, comprehensive JSON object for a fictional Instagram influencer profile with the username "${username}".

The influencer's niche should be plausible for their username (e.g., if the username is 'tokyo_eats', the content should be about food in Tokyo).

The JSON object MUST conform EXACTLY to the following JSON schema. Do not add any extra properties or deviate from the structure.

- Generate exactly 10 posts and 5 reels.
- All image and thumbnail URLs should use 'https://picsum.photos/seed/UNIQUE_SEED/600' with a different, unique seed for each.
- Timestamps must be recent, in valid ISO 8601 format, and in descending chronological order.
- Ensure all counts (likes, comments, followers) are realistic and internally consistent.
- The engagement rate should be calculated correctly based on the generated post data using the formula: (((total likes + total comments of recent 10 posts) / 10) / followersCount) * 100.
- The entire output MUST be ONLY the raw JSON object, without any markdown formatting.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        profile: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                username: { type: Type.STRING },
                                profilePictureUrl: { type: Type.STRING },
                                followersCount: { type: Type.INTEGER },
                                followingCount: { type: Type.INTEGER },
                                postsCount: { type: Type.INTEGER },
                                bio: { type: Type.STRING },
                            },
                        },
                        analytics: {
                            type: Type.OBJECT,
                            properties: {
                                averageLikes: { type: Type.INTEGER },
                                averageComments: { type: Type.INTEGER },
                                engagementRate: { type: Type.NUMBER },
                            },
                        },
                        posts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    imageUrl: { type: Type.STRING },
                                    caption: { type: Type.STRING },
                                    likesCount: { type: Type.INTEGER },
                                    commentsCount: { type: Type.INTEGER },
                                    timestamp: { type: Type.STRING },
                                    analysis: {
                                        type: Type.OBJECT,
                                        properties: {
                                            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                                            vibe: { type: Type.STRING },
                                            lightingQuality: { type: Type.STRING },
                                            visualAppeal: { type: Type.STRING },
                                            brandConsistency: { type: Type.STRING },
                                        },
                                    },
                                },
                            },
                        },
                        reels: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    thumbnailUrl: { type: Type.STRING },
                                    caption: { type: Type.STRING },
                                    viewsCount: { type: Type.INTEGER },
                                    likesCount: { type: Type.INTEGER },
                                    commentsCount: { type: Type.INTEGER },
                                    analysis: {
                                        type: Type.OBJECT,
                                        properties: {
                                            detectedObjects: { type: Type.ARRAY, items: { type: Type.STRING } },
                                            vibe: { type: Type.STRING },
                                            descriptiveTags: { type: Type.ARRAY, items: { type: Type.STRING } },
                                        },
                                    },
                                },
                            },
                        },
                        audience: {
                            type: Type.OBJECT,
                            properties: {
                                gender: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            label: { type: Type.STRING },
                                            value: { type: Type.INTEGER },
                                        },
                                    },
                                },
                                age: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            label: { type: Type.STRING },
                                            value: { type: Type.INTEGER },
                                        },
                                    },
                                },
                                geography: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            label: { type: Type.STRING },
                                            value: { type: Type.INTEGER },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        
        const jsonText = response.text;
        const jsonData = JSON.parse(jsonText) as InstagramData;
        
        // Gemini might not set the username correctly, so we enforce it.
        jsonData.profile.username = username;

        return jsonData;

    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        throw new Error("Failed to generate AI-powered insights. Please try again.");
    }
};