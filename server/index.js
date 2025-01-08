import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Generate random chart data
app.get("/api/chart-data", (req, res) => {
  const { start, end } = req.query;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const data = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    data.push({
      time: `${currentDate.getHours()}:00`,
      updates: Math.floor(Math.random() * 100) + 50,
      alerts: Math.floor(Math.random() * 50) + 20,
    });
    currentDate.setHours(currentDate.getHours() + 1);
  }

  res.json(data);
});

// Generate alerts data
app.get("/api/alerts", (req, res) => {
  const { start, end, source } = req.query;

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Generate sample alerts
  const sources = ["Database", "Server", "Application", "Network", "Security"];
  const descriptions = [
    "High CPU Usage Detected",
    "Memory Usage Exceeded Threshold",
    "Database Connection Failed",
    "Network Latency Spike",
    "Security Breach Attempt",
    "Disk Space Running Low",
    "API Response Time Degraded",
  ];

  // Generate random alerts within the date range
  const alerts = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // Generate 1-3 alerts per day
    const alertsCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < alertsCount; i++) {
      alerts.push({
        id: Math.random().toString(36).substr(2, 9),
        source: sources[Math.floor(Math.random() * sources.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        date: new Date(currentDate).toISOString(),
        severity: Math.floor(Math.random() * 3) + 1 // Add severity: 1 (low), 2 (medium), 3 (high)
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Apply source filter if specified
  const filteredAlerts = source === "all" ? alerts : alerts.filter((alert) => alert.source === source);

  res.json(filteredAlerts);
});

// Generate stats data
app.get("/api/stats", (_, res) => {
  res.json({
    queryResponseTime: Math.floor(Math.random() * 200) + 100,
    cpuLoadTime: (Math.random() * 2 + 0.5).toFixed(1),
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
