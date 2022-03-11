import React from "react";
import CurrentStreak from "../components/currentStreak";
import Layout from "../components/layout";
import { HeatMapGrid } from "react-grid-heatmap";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { getSessionInfo, getFullRecord } from "../database/model";
import { cleanFullWeekArr, scoreDataArr } from "./data";
import styled from "styled-components";

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const StyledTitle = styled.h3`
  font-family: var(--heading-font);
`;
const StyledDiv = styled.div`
  border: 3px solid var(--color-one);
  text-align: center;
`;

const StyledH2 = styled.h2`
  color: var(--color-two);
  font-family: var(--heading-font);
  margin: 0;
  text-align: center;
  font-size: 1.7rem;
  border-bottom: 1px solid var(--color-one);
  display: inline-block;
`;

export async function getServerSideProps({ req, res }) {
  const userData = await getSessionInfo(req.cookies.sid);
  const user_id = JSON.parse(userData.data).user_id;

  //queries db and returns all record data for user
  const fullRecordData = await getFullRecord(1);

  //map over the array of records and replace SQL with JS date then add day of week key with value for relevant day
  const fullRecord = fullRecordData.map((record) => {
    const stringDate = String(record.date).slice(0, 10);
    record.date = stringDate;
    const dayOfWeek = new Date(record.date).getDay();
    //console.log(dayOfWeek);
    record.DOW = dayOfWeek;
    // const recordObj = { taken: date.taken, date: dayOfWeek };
    return record;
  });

  //sort into date order
  const sortedFullRecord = fullRecord.sort((a, b) => {
    return a.date - b.date;
  });

  // console.log(51, sortedFull);
  //place sorted inside another array - need to refactor this is a temp fix for old code
  const fullWeek = [sortedFullRecord];

  //turn array of objects into array of arrays in order to group by date
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
  // then flatten edited data
  const flatData = editedData.flat(1);

  // currently hardcord but should be a db query to check their number of meds
  const numbofMeds = 3;
  //loop through arrays and create divide into days based on no. of meds taking each day
  const groupedData = [];
  for (let i = 0; i < flatData.length; i += numbofMeds) {
    const dateArray = flatData.slice(i, i + numbofMeds);
    groupedData.push(dateArray);
  }
  //create a score for each day based on the number of meds taken that day
  const scoreData = groupedData.map((nestArr) => {
    let score = 0;
    for (let i = 0; i < nestArr.length; i++) {
      if (nestArr[i][0] === true) {
        score++;
      }
    }
    return score;
  });

  // console.log("MAP DATA", scoreData);
  //console.log("FULL WEEK", fullWeek);

  const byDayArray = [];
  for (let i = 0; i < sortedFullRecord.length; i += numbofMeds) {
    const dateArray = sortedFullRecord.slice(i, i + numbofMeds);
    byDayArray.push(dateArray);
  }
  console.log(98, byDayArray);
  //first object in byDayArray now has the score
  const dayScore = byDayArray.map((day, ind, arr) => {
    day[0].score = scoreData[ind];
    return day;
  });
  //console.log(101, dayScore);

  return {
    props: { dayScore },
  };
}

export default function Record({ dayScore }) {
  return (
    <Layout>
      <StyledDiv className="box">
        <StyledH2>Current Streak</StyledH2>
        <CurrentStreak currentStreak={7}></CurrentStreak>
        <StyledList>
          {dayScore &&
            dayScore.map((day) => (
              <div key={day}>
                {day[0].date} Score: {day[0].score} <br />
              </div>
            ))}
        </StyledList>
      </StyledDiv>
    </Layout>
  );
}

// byDayArray[0]
//[
//   { taken: true, date: 'Mon Feb 14', DOW: 1 },
//   { taken: true, date: 'Mon Feb 14', DOW: 1 },
//   { taken: true, date: 'Mon Feb 14', DOW: 1 },
//   score: 3
// ]
