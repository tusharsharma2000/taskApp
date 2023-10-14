import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [wontTasks, setWonttasks] = useState([]);
  const [couldTasks, setCouldTasks] = useState([]);
  const [mustTasks, setMustTasks] = useState([]);

  const url = "https://run.mocky.io/v3/b755e0f3-8ce7-438d-a9d0-63b97bea9808";

  const fetchInfo = () => {
    return axios.get(url).then((response) =>{
      setWonttasks(response.data[0]);
      
      // setWonttasks();
      setCouldTasks(response.data[1]);
      setMustTasks(response.data[2]);
      // console.log(response.data[0].tasks);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [task, setTask] = useState({
    id:"",
    title: "",
    description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    task.id = String(new Date().getTime());
    const cpData = wontTasks;
    cpData.tasks.push(task);
    setWonttasks(cpData);
    setTask({
      id:"",
      title: "",
      description: "",});
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-7xl mx-auto bg-white shadow-md rounded-lg"
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
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold"
          >
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

      <div className="board p-8">
        <h2 className="board__title font-bold text-3xl w-full bg-[#6a5acd] p-2 text-white">
          Tasks
        </h2>
        <div className="board__columns grid grid-cols-3 gap-3 py-4">
          <div className="column bg-[#6a5acd] text-white p-1 ">
            <h2 className="column__title text-2xl p-1 font-bold">
              {wontTasks.title}
            </h2>
            <div className="column__cards p-3 border-gray-950">
              {wontTasks["tasks"] &&
                wontTasks["tasks"].map((task, index) => (
                  <div
                    className="card bg-[darkslateblue] p-2 m-2 text-left	rounded border-2"
                    key={index}
                  >
                    <h3 className="card__title">{task.title}</h3>
                    <p className="card__description">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="column bg-[#6a5acd] text-white p-1 ">
            <h2 className="column__title text-2xl p-1 font-bold">
              {couldTasks.title}
            </h2>
            <div className="column__cards p-3 border-gray-950">
              {couldTasks["tasks"] &&
                couldTasks["tasks"].map((task, index) => (
                  <div
                    className="card bg-[darkslateblue] p-2 m-2 text-left	rounded border-2"
                    key={index}
                  >
                    <h3 className="card__title">{task.title}</h3>
                    <p className="card__description">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="column bg-[#6a5acd] text-white p-1 ">
            <h2 className="column__title text-2xl p-1 font-bold">
              {mustTasks.title}
            </h2>
            <div className="column__cards p-3 border-gray-950">
              {mustTasks["tasks"] &&
                mustTasks["tasks"].map((task, index) => (
                  <div
                    className="card bg-[darkslateblue] p-2 m-2 text-left	rounded border-2"
                    key={index}
                  >
                    <h3 className="card__title">{task.title}</h3>
                    <p className="card__description">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
