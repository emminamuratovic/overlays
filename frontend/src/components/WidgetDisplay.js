import React from "react";

const WidgetDisplay = ({ data }) => {

  return (
    <div className="flex-1 bg-white p-4">
      <h1 className="text-2xl">Widget Display</h1>
      {/* Display logic for the widgets will go here */}
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {data.map((widget, index) => (
            <li key={index}>{widget.response}</li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetDisplay;