import React from "react";
// import mewurk from "./assets/mewurk_logo.jpeg";

const Experience = (props) => {
  const { img, company, title, timeline } = props;
  return (
    <div className="flex items-center">
      <img src={img} alt={company} className="w-14 h-14 mr-4 rounded-[50%]" />
      <div className=" flex flex-col h-full w-[-webkit-fill-available]">
        <div className="h-[60%] text-[18px] font-bold flex justify-between">
          <div>{title}</div>
          <div>{timeline}</div>
        </div>
        <div className="text-[16px]">{company}</div>
      </div>
    </div>
  );
};

export default Experience;
