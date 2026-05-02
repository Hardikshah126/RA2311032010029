require("dotenv").config();
const axios = require("axios");

async function Log(stack, level, pkg, message) {
    try {
        await axios.post(
            `${process.env.BASE_URL}/logs`,
            {
                stack,
                level,
                package: pkg,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        console.log("✅ Log:", message);
    } catch (err) {
        console.error("❌ Log Error:", err.response?.data);
    }
}

module.exports = { Log };