# Backend Evaluation – RA2311032010029

This project was developed as part of a backend evaluation test. 
---

## Features

### 🔹 Logging Middleware

* Implemented a reusable `Log()` function
* Sends logs to external logging API
* Used across all modules for tracking execution

---

### 🔹 Vehicle Maintenance Scheduler

* Fetches depot and vehicle data from API
* Uses a knapsack-based approach to maximize total impact
* Ensures total duration does not exceed mechanic hours
* Logs important steps during execution

---

### 🔹 Notification System

* Fetches notifications from API
* Prioritizes notifications (Placement > Event > Others)
* Returns top 10 most important notifications
* Integrated logging for monitoring

---

## Tech Stack

* Node.js
* Axios
* dotenv

---

## Outputs

### 🔹 Logging Middleware

<img width="467" height="87" alt="log_success" src="https://github.com/user-attachments/assets/dd8ad509-8ead-48a6-8182-7fe9f0ee27ee" />

---

### 🔹 Vehicle Scheduler
<img width="909" height="246" alt="scheduler_output" src="https://github.com/user-attachments/assets/df66a058-18cc-4701-8b8f-015aad091296" />
---

### 🔹 Notifications
<img width="788" height="405" alt="notifications_output" src="https://github.com/user-attachments/assets/1396cfcb-5dc3-4220-8d74-c5762bd59f14" />


---

## Project Structure

```
RA2311032010029/
│
├── logging_middleware/
│   └── logger.js
│
├── vehicle_maintenance_scheduler/
│   ├── index.js
│   └── notifications.js
│
├── screenshots/
│   ├── log_success.png
│   ├── scheduler_output.png
│   └── notifications_output.png
│
├── notification_system_design.md
├── package.json
├── .gitignore
```
