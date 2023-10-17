import React from "react";

export const TaskCard = ({ title, description }) => {
  return (
    <div className="card bg-[darkslateblue] p-2 m-2 text-left rounded border-2">
      <h3 className="card__title py-px text-base font-bold">{title}</h3>
      <p className="card__description italic text-[15px]">{description}</p>
    </div>
  );
};