import axios from "axios";
import { knapsack } from "../utils/knapsack.js";
import { Log } from "../utils/logging.js";

export async function scheduleVehicles(depotId) {
  try {
    await Log(
      "backend",
      "info",
      "service",
      `Fetching tasks for depot ${depotId}`
    );

    const response = await axios.get(
      `http://4.224.186.213/evaluation-service/tasks?depotId=${depotId}`
    );

    const tasks = response.data.tasks;
    const budget = response.data.mechanicHourBudget;

    await Log(
      "backend",
      "info",
      "service",
      `Retrieved ${tasks.length} tasks with budget ${budget}`
    );

    const result = knapsack(tasks, budget);

    await Log(
      "backend",
      "info",
      "service",
      `Selected ${result.selectedTasks.length} tasks with total impact score ${result.maxImpactScore}`
    );

    return result;
  } catch (error) {
    await Log(
      "backend",
      "error",
      "service",
      `Vehicle scheduling failed: ${error.message}`
    );

    throw error;
  }
}