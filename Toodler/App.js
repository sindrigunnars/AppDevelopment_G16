import React, { useState } from "react";
import AppContainer from "./src/routes";
import { DataContext } from "./src/components/data";
import jsonData from "./src/resources/data.json";

export default function App() {
  const [data, setData] = useState(jsonData);

  const setTasks = (tasks) => {
    setData({
      ...data,
      tasks,
    });
  };

  return (
    <DataContext.Provider value={{ data, setData, setTasks }}>
      <AppContainer />
    </DataContext.Provider>
  );
}
