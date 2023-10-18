import { useEffect, useState } from "react";
import "./App.css";
import { TaskCard } from "./components/taskCard.jsx";
import { AddTask } from "./components/addTask.jsx";
import axios from "axios";
import { TaskList } from "./components/taskList.jsx";

function App() {
  const [wontTasks, setWonttasks] = useState([]);
  const [couldTasks, setCouldTasks] = useState([]);
  const [mustTasks, setMustTasks] = useState([]);

  // const url = "https://run.mocky.io/v3/b755e0f3-8ce7-438d-a9d0-63b97bea9808";
  const url2 =
    "https://api-regional.codesignalcontent.com/task-management-system-2/backlog";

  let list = {};

  const fetchInfo = (taskId) => {
    const url = `https://api-regional.codesignalcontent.com/task-management-system-2/tasks/${taskId}`;

    return axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const fetchInfo2 = () => {
    return axios.get(url2).then((res) => res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data2 = await fetchInfo2();
      if (data2) {
        for (const item of data2) {
          const title = item.title;
          const taskData = await Promise.all(
            item.tasks.map((task) => fetchInfo(task))
          );
          const listCopy = { ...list };
          listCopy[title] = taskData.filter(Boolean); // Filter out any null data
          list = listCopy;
        }
      }
      setWonttasks(list["Won't haves"]);
      setCouldTasks(list["Could haves"]);
      setMustTasks(list["Must haves"]);
    };

    fetchData();
  }, []);


  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
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
    const cpData = [...wontTasks];
    cpData.push(task);
    setWonttasks(cpData);
    setTask({
      id: "",
      title: "",
      description: "",
    });
  };

  return (
    <div className="App bg-[#9e91e7] pt-4">
      <AddTask
        task={task}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <div className="board p-8">
        <h2 className="board__title font-bold text-3xl w-full bg-[#6a5acd] p-2 text-white">
          Tasks
        </h2>
        <div className="board__columns grid grid-cols-3 gap-3 py-4">
          <TaskList tasks={wontTasks} title="Won't Task" />
          <TaskList tasks={couldTasks} title="Could Task" />
          <TaskList tasks={mustTasks} title="Must Task" />
        </div>
      </div>
    </div>
  );
}

export default App;
