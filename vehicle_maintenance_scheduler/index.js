require("dotenv").config();
const axios = require("axios");
const { Log } = require("../logging_middleware/logger");

const BASE_URL = process.env.BASE_URL;
const headers = {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
};

// 🔥 Knapsack function
function knapsack(tasks, maxHours) {
    const n = tasks.length;

    const dp = Array(n + 1)
        .fill()
        .map(() => Array(maxHours + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const duration = tasks[i - 1].Duration;
        const impact = tasks[i - 1].Impact;

        for (let w = 0; w <= maxHours; w++) {
            if (duration <= w) {
                dp[i][w] = Math.max(
                    impact + dp[i - 1][w - duration],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][maxHours];
}

async function runScheduler() {
    try {
        await Log("backend", "info", "service", "Fetching depots");

        const depotsRes = await axios.get(`${BASE_URL}/depots`, { headers });
        const vehiclesRes = await axios.get(`${BASE_URL}/vehicles`, { headers });

        const depots = depotsRes.data.depots;
        const tasks = vehiclesRes.data.vehicles;

        for (const depot of depots) {
            const maxHours = depot.MechanicHours;

            const maxImpact = knapsack(tasks, maxHours);

            console.log(`Depot ${depot.ID} → Max Impact: ${maxImpact}`);

            await Log(
                "backend",
                "info",
                "service",
                `Depot ${depot.ID} optimized with impact ${maxImpact}`
            );
        }

    } catch (err) {
        await Log("backend", "error", "service", "Scheduler failed");
        console.error(err.message);
    }
}

runScheduler();