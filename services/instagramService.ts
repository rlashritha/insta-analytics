import type { InstagramData } from "../types";

const API_BASE_URL = "http://localhost:8000";

export const fetchInstagramData = async (
  username: string
): Promise<InstagramData> => {
  if (!username.trim()) {
    throw new Error("Username is required");
  }

  try {
    console.log(`Fetching data for username: ${username}`);

    const response = await fetch(
      `${API_BASE_URL}/scrape/${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found or profile is private");
      } else if (response.status === 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
    }

    const data: InstagramData = await response.json();

    // Validate that we received the expected data structure
    if (
      !data.profile ||
      !data.analytics ||
      !data.posts ||
      !data.reels ||
      !data.audience
    ) {
      throw new Error("Invalid data format received from server");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Instagram data:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }

    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred");
  }
};

// Health check function to verify backend connectivity
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};
