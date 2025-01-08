import React, { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ChartBarIcon,
  ClockIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { TableComponent } from "./Table";
import StatsCard from "./StatsCard";
import LineChart from "./LineChart";
import LoaderSpinner from "../ui/loadingSpinner";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date("2025-01-01"));
  const [endDate, setEndDate] = useState(new Date("2025-01-08"));
  const [selectedSource, setSelectedSource] = useState("all");
  const [appliedSource, setAppliedSource] = useState("all");
  const [chartData, setChartData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    queryResponseTime: 0,
    cpuLoadTime: 0,
  });

  const [timeRange, setTimeRange] = useState("24h");
  const [chartStartDate, setChartStartDate] = useState(null);
  const [chartEndDate, setChartEndDate] = useState(null);

  // Get unique sources from alerts
  const uniqueSources = useMemo(() => {
    const sources = new Set(alerts.map((alert) => alert.source));
    return Array.from(sources).sort();
  }, [alerts]);

  // Filter and sort alerts
  const filteredAndSortedAlerts = useMemo(() => {
    let filtered = [...alerts];

    // Filter by source if not "all"
    if (appliedSource !== "all") {
      filtered = filtered.filter((alert) => alert.source === appliedSource);
    }

    return filtered;
  }, [alerts, appliedSource]);

  // Get date range for chart based on selected time range
  useEffect(() => {
    const end = new Date("2025-01-08T19:18:28+05:00");
    let start = new Date(end);

    switch (timeRange) {
      case "24h":
        start.setHours(end.getHours() - 24);
        break;
      case "7d":
        start.setDate(end.getDate() - 7);
        break;
      case "30d":
        start.setDate(end.getDate() - 30);
        break;
      default:
        break;
    }

    setChartStartDate(start);
    setChartEndDate(end);
  }, [timeRange]);

  // Separate function to fetch chart data
  const fetchChartData = async () => {
    try {
      const chartResponse = await fetch(
        "http://localhost:3001/api/chart-data?" +
          new URLSearchParams({
            start: chartStartDate
              ? format(chartStartDate, "yyyy-MM-dd")
              : format(startDate, "yyyy-MM-dd"),
            end: chartEndDate
              ? format(chartEndDate, "yyyy-MM-dd")
              : format(endDate, "yyyy-MM-dd"),
          })
      );
      const chartData = await chartResponse.json();
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setChartData([]);
    }
  };

  // Separate function to fetch alerts data
  const fetchAlertsData = async () => {
    setLoading(true);
    try {
      const alertsResponse = await fetch(
        "http://localhost:3001/api/alerts?" +
          new URLSearchParams({
            start: format(startDate, "yyyy-MM-dd"),
            end: format(endDate, "yyyy-MM-dd"),
            source: appliedSource,
          })
      );
      const alertsData = await alertsResponse.json();
      setAlerts(alertsData);
    } catch (error) {
      console.error("Error fetching alerts data:", error);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  // Separate function to fetch stats data
  const fetchStatsData = async () => {
    try {
      const statsResponse = await fetch("http://localhost:3001/api/stats");
      const statsData = await statsResponse.json();
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching stats data:", error);
      setStats({
        queryResponseTime: 0,
        cpuLoadTime: 0,
      });
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchChartData();
    fetchAlertsData();
    fetchStatsData();
  }, []);

  // Effect to fetch chart data when time range changes
  useEffect(() => {
    if (chartStartDate && chartEndDate) {
      fetchChartData();
      fetchStatsData(); // Update stats when chart data changes
    }
  }, [chartStartDate, chartEndDate]);

  // Handle alerts filter button click
  const handleFilterClick = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    setAppliedSource(selectedSource);
    fetchAlertsData();
  };

  // Handle time range change for chart
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const statsData = [
    {
      title: "Query Response Time",
      value: `${stats.queryResponseTime} ms`,
      icon: ChartBarIcon,
      backgroundColor: "bg-emerald-600",
    },
    {
      title: "CPU Load Time",
      value: `${stats.cpuLoadTime} ms`,
      icon: ClockIcon,
      backgroundColor: "bg-blue-600",
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white flex flex-col md:grid md:grid-cols-12 items-center dark:bg-gray-800 rounded-lg p-3 w-full gap-4 md:gap-0">
        <h1 className="text-2xl font-semibold dark:text-white text-center md:col-span-11 order-2 md:order-1">
          Dashboard
        </h1>
        <img
          className="w-12 h-12 rounded-full self-center md:justify-self-end order-1 md:order-2"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
        />
      </div>

      {loading ? (
        <>
          <LoaderSpinner showLoader />
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row w-full gap-5 mt-6">
            {/* Chart Section */}
            <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-lg p-6 mt-8">
              <div className="flex flex-col lg:flex-row gap-3 justify-between lg:items-center mb-6">
                <div className="flex flex-col  ">
                  <h2 className="text-xl font-semibold dark:text-white">
                    Alerts and Updates
                  </h2>
                  <div className="text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-sm">3</span> Alerts |{" "}
                    <span className="font-medium text-sm">10</span> Updates
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center  space-x-4 ">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded ${
                          chartData.some((d) => d.updates > 0)
                            ? "bg-emerald-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          chartData.some((d) => d.updates > 0)
                            ? "text-gray-600 dark:text-gray-400"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        Updates
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded ${
                          chartData.some((d) => d.alerts > 0)
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          chartData.some((d) => d.alerts > 0)
                            ? "text-gray-600 dark:text-gray-400"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        Alerts
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <select
                        className="border rounded-lg px-3 py-1 bg-transparent dark:border-gray-600 dark:text-white text-sm"
                        value={timeRange}
                        onChange={handleTimeRangeChange}
                      >
                        <option value="24h">Last 24 hrs</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-80">
                <LineChart chartData={chartData} />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 mt-8 w-full lg:w-1/3">
              {statsData.map((item, index) => (
                <StatsCard data={item} key={index} />
              ))}
            </div>
          </div>

          {/* Alerts Table */}

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center justify-between  md:space-x-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold dark:text-white">
                  Critical Alerts
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  10 Today
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Date Range Picker */}
                <div className="relative">
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      const [start, end] = update;
                      setStartDate(start);
                      setEndDate(end);
                    }}
                    className="border appearance-none md:w-[250px] w-full rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholderText="Start Date - End Date"
                    isClearable={false}
                    dateFormat="MMM d, yyyy"
                    showPopperArrow={false}
                    customInput={
                      <div className="flex items-center justify-between cursor-pointer">
                        <input
                          type="text"
                          readOnly
                          className="border-none bg-transparent outline-none w-full cursor-pointer"
                          value={
                            startDate && endDate
                              ? `${format(startDate, "MMM d, yyyy")} - ${format(
                                  endDate,
                                  "MMM d, yyyy"
                                )}`
                              : "Start Date - End Date"
                          }
                        />
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    }
                  />
                </div>

                {/* Source Filter */}
                <div className="relative">
                  <select
                    className="border appearance-none md:w-[220px] w-full rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                  >
                    <option value="all">Filter by Source</option>
                    {uniqueSources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Apply Filter Button */}
                <button
                  onClick={handleFilterClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2 transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : filteredAndSortedAlerts.length === 0 ? (
              <div className="text-center py-4 dark:text-gray-400">
                No alerts found
              </div>
            ) : (
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <TableComponent data={filteredAndSortedAlerts} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
