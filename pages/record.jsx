import React from "react";
import CurrentStreak from "../components/currentStreak";
import Layout from "../components/layout";

export default function Record() {
  return (
    <Layout>
      <div>
        <h1>Calendar</h1>
        <h2>Current Streak</h2>
        <CurrentStreak currentStreak={7}></CurrentStreak>
      </div>
    </Layout>
  );
}
