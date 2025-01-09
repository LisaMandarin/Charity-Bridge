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
    console.log("result", result);

    if (!result) {
      throw new Error("No result found during getUser");
    }
    return result.data.message;
  } catch (error) {
    console.error("Failed to get user: ", error.message);
    return null;
  }
}
