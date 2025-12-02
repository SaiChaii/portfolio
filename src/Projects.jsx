import axios from "axios";
import React, { useEffect, useState } from "react";
import RepoCarousel from "./RepoCarousel";

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
    <div className="">
      <RepoCarousel repos={data} />
    </div>
  );
};

export default Projects;
