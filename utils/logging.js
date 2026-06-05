// utils/logger.js

import axios from "axios";

const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

// Store your token in .env
const TOKEN = process.env.ACCESS_TOKEN;

export async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      LOG_API_URL,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log sent:", response.data);
  } catch (error) {
    console.error("Logging failed");
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
  }
}