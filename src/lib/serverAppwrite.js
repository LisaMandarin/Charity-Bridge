import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://cb-server-9jxe.onrender.com";

export async function getUser(userId) {
  try {
    if (!userId) {
      throw new Error("Invalid userId");
    }

    const result = await axios.get(`${baseURL}/users/${userId}`);

    if (!result) {
      throw new Error("No result found during getUser");
    }
    return result.data.data;
  } catch (error) {
    console.error("Failed to get user: ", error.message);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const result = await axios.get(`${baseURL}/users/`);

    if (result.data && Array.isArray(result.data.data)) {
      return result.data.data;
    }
    throw new Error("Invalid response format for getAllUsers");
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
