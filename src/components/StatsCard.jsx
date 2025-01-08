import React from "react";

const StatsCard = ({ data }) => {
  return (
    <div
      className={`${data?.backgroundColor} bg-blue-600 rounded-lg p-6 text-white`}
    >
      <div className="flex items-center">
        <div className="ml-4 flex-col space-y-2">
          <data.icon className="h-8 w-8" />
          <h3 className="text-lg font-medium">{data?.title}</h3>
          <p className="text-5xl font-bold">{data?.value} </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
