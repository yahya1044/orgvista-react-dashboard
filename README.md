# OrgVista Dashboard

A modern, responsive dashboard built with React, Vite, and Tailwind CSS.

## Features

- Responsive layout with collapsible sidebar
- Dark/Light theme toggle with system preference detection
- Real-time data visualization using Recharts
- Date range filtering
- Source-based filtering
- Sortable tables
- Mock API server for development

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Heroicons
- Recharts
- date-fns
- Express (for mock API)

## Getting Started

1. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd orgvista-dashboard-vite
npm install

# Install backend dependencies
cd server
npm install
```

2. Start the development server:

```bash
# Start the backend server (from the server directory)
npm start

# In a new terminal, start the frontend development server (from the project root)
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
orgvista-dashboard-vite/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   └── Sidebar.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── index.js
│   └── package.json
├── public/
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
└── tailwind.config.js
```

## Features

### Dashboard
- System activity chart
- Real-time statistics
- Critical alerts table with filtering and sorting
- Date range selection
- Source-based filtering

### Sidebar
- Collapsible navigation
- Dark/Light theme toggle
- Responsive design
- Persistent state using localStorage

## API Endpoints

The mock server provides the following endpoints:

- `GET /api/chart-data`: Returns time-series data for the system activity chart
- `GET /api/alerts`: Returns filtered and sorted alert data
- `GET /api/stats`: Returns system statistics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
