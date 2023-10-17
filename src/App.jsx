import { useEffect, useState } from "react";
import "./App.css";
import { TaskCard } from "./components/taskCard.jsx";
import { AddTask } from "./components/AddTask.jsx";
import axios from "axios";
import { TaskList } from "./components/taskList.jsx";

function App() {
  const [wontTasks, setWonttasks] = useState([]);
  const [data, setData] = useState([]);
  const [couldTasks, setCouldTasks] = useState([]);
  const [mustTasks, setMustTasks] = useState([]);

  let taskId;
  const url = "https://run.mocky.io/v3/b755e0f3-8ce7-438d-a9d0-63b97bea9808";
  const url2 =
    "https://api-regional.codesignalcontent.com/task-management-system-2/backlog";

  const fetchInfo = (taskId) => {
    // console.log(taskId);
    // const url = `https://api-regional.codesignalcontent.com/task-management-system-2/tasks/${taskId}`;

    return axios.get(url).then((res, err) => {
      // if (res) {
      //   // console.log(res.data)
      //   let myData =data;

      //   myData.push(res.data);
      //   setData(myData);
      //   console.log(data);
      // }
      setWonttasks(res.data[0]);
      setCouldTasks(res.data[1]);
      setMustTasks(res.data[2]);
      // console.log(response.data[0].tasks);
    });
  };

  const fetchInfo2 = () => {
    return axios.get(url2).then((res, error) => {
      // console.log(res.data[0].tasks);
      res.data.map((item) =>
        // console.log(item.tasks)
        item.tasks.map(
          (task) =>
            // taskId = task
            fetchInfo(task)
          // console.log(task)
        )
      );
      // console.log(data);
    });
  };

  useEffect(() => {
    fetchInfo();
    // fetchInfo2();
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
    const cpData = wontTasks;
    cpData.tasks.push(task);
    setWonttasks(cpData);
    setTask({
      id: "",
      title: "",
      description: "",
    });
  };

  return (
    <div className="App">
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
          <TaskList wontTasks={wontTasks}/>
          <TaskList wontTasks={couldTasks}/>
          <TaskList wontTasks={mustTasks}/>
        </div>
      </div>
    </div>
  );
}

export default App;
