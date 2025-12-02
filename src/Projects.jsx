import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Projects = () => {
  const [data, setData] = useState();
  const getData = async () => {
    const res = await axios.get(`https://api.github.com/users/SaiChaii/repos`);
    setData(res?.data);
  };
  console.log(data, "data");
  useEffect(() => {
    getData();
  }, []);
  console.log(data, "data");
  return (
    <div className="h-[20em]">
      {data ? (
        Object.entries(data).forEach(([key, value]) => {
          <Card id={key} value={value} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Projects;
