import React from 'react'

export const AddTask = ({ task, handleInputChange, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-7xl mx-auto bg-white shadow-md rounded-lg"
      key={task.id}
    >
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-center mb-4">Add Task</h2>
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold">
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={task.description}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#5647b9] hover:bg-[#32248c] text-white font-bold py-2 px-4 rounded focus:outline-none"
      >
        Create Task
      </button>
    </form>
  );
};
