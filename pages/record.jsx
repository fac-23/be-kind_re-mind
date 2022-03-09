import React from "react";
import CurrentStreak from "../components/currentStreak";
import Layout from "../components/layout";
import { HeatMapGrid } from "react-grid-heatmap";

//need to work out how we will split the months -
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const xLabels = new Array(26).fill(0).map((_, i) => {
  `${i}`;
});
const yLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 50 + 50))
  );

//data suggestion would be that the taken values are mapped over and true becomes 1, false becomes 0
// that way each date has a score which will dictate the color of the square

const takenData = [
  [0, 0, 1],
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 1],
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 1],
  [1, 1, 0],
  [0, 1, 1],
];

export default function Record() {
  return (
    <Layout>
      <div>
        <h1>Calendar</h1>
        <h2>Current Streak</h2>
        <CurrentStreak currentStreak={7}></CurrentStreak>
        <HeatMapGrid
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          // Reder cell with tooltip
          cellRender={(x, y, value) => (
            <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
          )}
          xLabelsStyle={(index) => ({
            color: index % 2 ? "transparent" : "#777",
            fontSize: ".65rem",
          })}
          yLabelsStyle={() => ({
            fontSize: ".65rem",
            textTransform: "uppercase",
            color: "#777",
          })}
          cellStyle={(_x, _y, ratio) => ({
            background: `rgb(12, 160, 44, ${ratio})`,
            fontSize: ".7rem",
            color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
          })}
          cellHeight="1.5rem"
          xLabelsPos="bottom"
          onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
          // yLabelsPos="right"
          // square
        />
      </div>
    </Layout>
  );
}
