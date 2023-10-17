import React from 'react'
import { TaskCard } from './taskCard.jsx';

export const TaskList = ({wontTasks}) => {
  return (
    <div className="column bg-[#6a5acd] text-white p-1 ">
      <h2 className="column__title text-2xl p-1 font-bold">
        {wontTasks.title}
      </h2>
      <div className="column__cards p-3 border-gray-950">
        {wontTasks["tasks"] &&
          wontTasks["tasks"].map((task, index) => (
            <TaskCard title={task.title} description={task.description} />
          ))}
      </div>
    </div>
  );
}
