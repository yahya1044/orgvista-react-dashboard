import React from "react";

export const TableComponent = ({ data }) => {
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
        <tr>
          <th
            scope="col"
            className="py-3 px-4 whitespace-nowrap dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            Source{" "}
          </th>
          <th
            scope="col"
            className="py-3 px-4 whitespace-nowrap dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            Description{" "}
          </th>
          <th
            scope="col"
            className="py-3 px-4 whitespace-nowrap dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            Date & Time{" "}
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((alert) => (
          <tr
            key={alert?.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td className="py-3 px-4 whitespace-nowrap dark:text-gray-300">
              <div className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    alert?.severity === 3
                      ? "bg-red-500"
                      : alert?.severity === 2
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></span>
                {alert?.source}
              </div>
            </td>
            <td className="py-3 px-4 dark:text-gray-300 max-w-xs truncate">
              {alert?.description}
            </td>
            <td className="py-3 px-4 whitespace-nowrap dark:text-gray-300">
              {new Date(alert?.date).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
