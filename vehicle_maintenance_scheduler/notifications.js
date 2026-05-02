require("dotenv").config();
const axios = require("axios");
const { Log } = require("../logging_middleware/logger");

const BASE_URL = process.env.BASE_URL;
const headers = {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
};

// Priority function
function getPriority(type) {
    if (type === "Placement") return 3;
    if (type === "Event") return 2;
    return 1;
}

async function runNotifications() {
    try {
        await Log("backend", "info", "service", "Fetching notifications");

        const res = await axios.get(`${BASE_URL}/notifications`, { headers });

        const notifications = res.data.notifications;

        // Sort by priority
        const sorted = notifications.sort(
            (a, b) => getPriority(b.Type) - getPriority(a.Type)
        );

        // Take top 10
        const top10 = sorted.slice(0, 10);

        console.log("\n🔥 Top 10 Notifications:\n");

        top10.forEach((n, i) => {
            console.log(`${i + 1}. ${n.Type} - ${n.Message}`);
        });

        await Log("backend", "info", "service", "Top 10 notifications generated");

    } catch (err) {
        await Log("backend", "error", "service", "Notification processing failed");
        console.error(err.response?.data || err.message);
    }
}

runNotifications();