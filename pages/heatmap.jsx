import React from "react";
import CurrentStreak from "../components/currentStreak";
import Layout from "../components/layout";
import { HeatMapGrid } from "react-grid-heatmap";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { getSessionInfo, getFullRecord } from "../database/model";

const numbofMeds = 3;

function prepareHeatmapData(dbArray) {
  const heatmapArr = dbArray.map((record) => {
    return Object.values(record);
  });

  const groupedData = [];
  for (let i = 0; i < heatmapArr.length; i += numbofMeds) {
    const dateArray = heatmapArr.slice(i, i + numbofMeds);
    groupedData.push(dateArray);
  }
  const mapData = groupedData.map((nestArr) => {
    let score = 0;
    for (let i = 0; i < nestArr.length; i++) {
      if (nestArr[i][0] === true) {
        score++;
      }
    }
    return score;
  });
  return mapData;
}

export async function getServerSideProps({ req, res }) {
  const userData = await getSessionInfo(req.cookies.sid);
  const user_id = JSON.parse(userData.data).user_id;

  const fullRecordData = await getFullRecord(1);

  fullRecordData.map((record) => {
    const stringDate = String(record.date);
    record.date = stringDate;
    const dayOfWeek = new Date(record.date).getDay();
    //console.log(dayOfWeek);
    record.DOW = dayOfWeek;
    // const recordObj = { taken: date.taken, date: dayOfWeek };
    return record;
  });

  const mondays = fullRecordData.filter((record) => {
    return record.DOW == 1;
  });
  const tuesdays = fullRecordData.filter((record) => {
    return record.DOW == 2;
  });
  const wednesdays = fullRecordData.filter((record) => {
    return record.DOW == 3;
  });
  const thursdays = fullRecordData.filter((record) => {
    return record.DOW == 4;
  });
  const fridays = fullRecordData.filter((record) => {
    return record.DOW == 5;
  });
  const saturdays = fullRecordData.filter((record) => {
    return record.DOW == 6;
  });
  const sundays = fullRecordData.filter((record) => {
    return record.DOW == 0;
  });
  const fullWeek = [
    mondays,
    tuesdays,
    wednesdays,
    thursdays,
    fridays,
    saturdays,
    sundays,
  ];
  //console.log("fullweek", fullWeek);

  function objToArray(arr) {
    const heatmapArr = arr.map((record) => {
      //console.log(record, "record");
      return Object.values(record);
    });
    //console.log(heatmapArr);
    return heatmapArr;
  }

  const editedData = fullWeek.map((record) => {
    return objToArray(record);
  });
  const flatData = editedData.flat(1);

  const groupedData = [];
  for (let i = 0; i < flatData.length; i += numbofMeds) {
    const dateArray = flatData.slice(i, i + numbofMeds);
    groupedData.push(dateArray);
  }

  const scoreData = groupedData.map((nestArr) => {
    let score = 0;
    for (let i = 0; i < nestArr.length; i++) {
      if (nestArr[i][0] === true) {
        score++;
      }
    }
    return score;
  });

  console.log("MAP DATA", scoreData);
  console.log("FULL WEEK", fullWeek);

  //console.log("cleanDate", cleanDateRecord);
  return {
    props: { fullWeek, scoreData },
  };
}

//create an array of arrays from db data
//loop over check date, if date matches previous then push here.
//If it's a new date push to new array
//slice last two digits off item 1 in array - if they are equal to next item, then push to array. If not create new array and push to that

//map over array, create a score for each date (false = 0, true + 1)

//if date ends 1 - then need to change to next month

//console.log(prepareHeatmapData(recordDBData));

//dummy data - format of data returned from DB query array of objects
const recordDBData = [
  { taken: true, date: "2022-03-02" },
  { taken: false, date: "2022-03-02" },
  { taken: true, date: "2022-03-02" },
  { taken: false, date: "2022-03-03" },
  { taken: true, date: "2022-03-03" },
  { taken: false, date: "2022-03-03" },
  { taken: false, date: "2022-03-04" },
  { taken: false, date: "2022-03-04" },
  { taken: false, date: "2022-03-04" },
  { taken: true, date: "2022-03-05" },
  { taken: true, date: "2022-03-05" },
  { taken: true, date: "2022-03-05" },
  { taken: true, date: "2022-03-06" },
  { taken: false, date: "2022-03-06" },
  { taken: true, date: "2022-03-06" },
  { taken: false, date: "2022-03-07" },
  { taken: true, date: "2022-03-07" },
  { taken: false, date: "2022-03-07" },
  { taken: false, date: "2022-03-08" },
  { taken: false, date: "2022-03-08" },
  { taken: false, date: "2022-03-08" },
  { taken: true, date: "2022-03-09" },
  { taken: true, date: "2022-03-09" },
  { taken: true, date: "2022-03-09" },
];

const today = new Date();
const cleanToday = JSON.stringify(today).slice(1, 11);

const mapData = [
  3, 3, 2, 3, 3, 3, 2, 3, 2, 3, 3, 0, 2, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 2, 2, 2,
];
const xLabels = new Array(5).fill(0).map((_, i) => {
  `${i}`;
});
const yLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const data = new Array(yLabels.length)
  .fill(0)
  .map(() => new Array(xLabels.length).fill(0).map(() => 10));

//data suggestion would be that the taken values are mapped over and true becomes 1, false becomes 0
// that way each date has a score which will dictate the color of the square

export default function Record({ scoreData }) {
  console.log(scoreData);
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
          onClick={(x, y) => alert(`Date:${today} (${x}, ${y})`)}
          // yLabelsPos="right"
          // square
        />
      </div>
    </Layout>
  );
}
