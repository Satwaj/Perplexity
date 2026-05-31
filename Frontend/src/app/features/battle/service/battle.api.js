const API_BASE = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "http://localhost:3000/api";

export const startBattle = async (problem) => {
  try {
    const response = await fetch(`${API_BASE}/battle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problem }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to start battle");
    }

    return await response.json();
  } catch (error) {
    console.error("Battle API Error:", error);
    throw error;
  }
};

export const getBattles = async () => {
  try {
    const response = await fetch(`${API_BASE}/battle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch battles");
    }

    return await response.json();
  } catch (error) {
    console.error("Get Battles Error:", error);
    throw error;
  }
};

export const deleteBattle = async (battleId) => {
  try {
    const response = await fetch(`${API_BASE}/battle/${battleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to delete battle");
    }

    return await response.json();
  } catch (error) {
    console.error("Delete Battle Error:", error);
    throw error;
  }
};
