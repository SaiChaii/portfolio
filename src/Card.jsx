import React from "react";

const Card = (props) => {
  const { name } = props;
  console.log(name, "name");
  return (
    <div className="h-[20%] w-[30%] bg-white border rounded-[6px] flex justify-center">
      <div className="w-[100%] text-left">{name}</div>
    </div>
  );
};

export default Card;
