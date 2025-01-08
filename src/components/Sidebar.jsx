import React, { useEffect } from "react";
import {
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({
  isDarkMode,
  setIsDarkMode,
  isCollapsed,
  setIsCollapsed,
}) => {
  // Add media query hook with localStorage support
  useEffect(() => {
    const handleResize = () => {
      const savedSidebar = localStorage.getItem("isSidebarCollapsed");
      const wasPreviouslyCollapsed = savedSidebar
        ? JSON.parse(savedSidebar)
        : false;

      if (window.innerWidth < 768) {
        // On small screens, always collapse
        setIsCollapsed(true);
      } else {
        // On larger screens, restore previous state
        setIsCollapsed(wasPreviouslyCollapsed);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);

  const menuItems = [
    { name: "Home", icon: HomeIcon },
    { name: "Dashboard", icon: HomeIcon, active: true },
    { name: "Manage Sub Admins", icon: UsersIcon },
    { name: "Manage Organizations", icon: BuildingOfficeIcon },
    { name: "Billing Management", icon: CreditCardIcon },
    { name: "System Updates", icon: ArrowsRightLeftIcon },
  ];

  return (
    <div
      className={`fixed h-full bg-white dark:bg-gray-800 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h1
          className={`font-bold text-xl dark:text-white ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          ORGVISTA
        </h1>
        <button
          onClick={() => {
            const newState = !isCollapsed;
            setIsCollapsed(newState);
            localStorage.setItem(
              "isSidebarCollapsed",
              JSON.stringify(newState)
            );
          }}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowsRightLeftIcon className="h-5 w-5 dark:text-white" />
        </button>
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center px-4 py-3 ${
              item.active
                ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">{item.name}</span>}
          </a>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-2 border-t dark:border-gray-700">
        <button
          onClick={() => {
            const newState = !isDarkMode;
            setIsDarkMode(newState);
            localStorage.setItem("isDarkMode", JSON.stringify(newState));
          }}
          className="flex items-center flex-col sm:flex-row justify-between w-full px-2 py-2 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-300"
        >
          <div
            className={`flex items-center space-x-2 ${
              !isDarkMode ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <SunIcon className="h-5 w-5" />
            <span className={`${isCollapsed ? "hidden" : "block"}`}>Light</span>
          </div>
          <div
            className={`flex items-center space-x-2 ${
              isDarkMode ? "text-white" : "text-gray-400"
            }`}
          >
            <MoonIcon className="h-5 w-5" />
            <span className={`${isCollapsed ? "hidden" : "block"}`}>Dark</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
