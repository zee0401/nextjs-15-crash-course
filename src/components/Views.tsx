import React from "react";

const Views = ({ id }: { id: string }) => {
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {id}</span>
      </p>
    </div>
  );
};

export default Views;
