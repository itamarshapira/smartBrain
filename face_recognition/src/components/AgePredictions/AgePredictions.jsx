// src/components/AgePieChart/AgePieChart.js

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import "./AgePredictions.css";
ChartJS.register(Title, Tooltip, Legend, ArcElement);

function AgePredictions({ agePredictions }) {
  // Prepare the data for the pie chart
  const data = {
    labels: agePredictions.map((concept) => concept.name),
    datasets: [
      {
        data: agePredictions.map((concept) => concept.value * 100),

        backgroundColor: [
          "rgba(0, 128, 0, 0.7)", // Dark green
          "rgba(255, 180, 50, 0.7)", // Darker yellow
          "rgba(200, 50, 90, 0.7)", // Darker pink
        ],

        borderWidth: 1,
      },
    ],
  };

  // Helper function to compute the midpoint of a range
  const getMidpoint = (range) => {
    const [start, end] = range.split("-").map(Number);
    return (start + end) / 2;
  };

  // Calculate the smart (weighted) average of the top 3 age predictions
  const totalWeight = agePredictions.reduce(
    (acc, concept) => acc + concept.value,
    0
  );
  const weightedAverage =
    agePredictions.reduce(
      (acc, concept) => acc + concept.value * getMidpoint(concept.name),
      0
    ) / totalWeight;

  return (
    <div
      className="age-predictions centerAge"
      style={{ width: "300px", height: "300px" }}
    >
      <p>
        <h3>Top 3 Age Predictions:</h3>
        <h4>proximaly Age: {weightedAverage.toFixed(2)}</h4>
      </p>
      <Pie data={data} />
    </div>
  );
}

export default AgePredictions;
