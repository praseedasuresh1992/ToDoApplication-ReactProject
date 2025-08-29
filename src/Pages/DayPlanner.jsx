import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleComplete, deleteTask } from "../redux/taskSlice";

function DayPlanner() {
  const [selectedDate, setSelectedDate] = useState("");
  const [taskText, setTaskText] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const tasksByDate = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!selectedDate) {
      alert("Please select a date first!");
      return;
    }
    if (taskText.trim() === "" || taskTime === "") {
      alert("Please enter a task and time!");
      return;
    }

    dispatch(addTask({ date: selectedDate, text: taskText, time: taskTime }));

    setTaskText("");
    setTaskTime("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      {/* Date Selector */}
      <div className="mb-4">
        <label className="font-medium">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="ml-2 border p-2 rounded"
        />
      </div>

      {/* Add Task */}
      {selectedDate && (
        <div className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Enter task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      )}

      {/* Show Tasks by Date */}
      <div>
        {Object.keys(tasksByDate).map((date) => (
          <div key={date} className="mb-6 border rounded p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">📌 {date}</h3>
            <ul>
              {tasksByDate[date].map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <div>
                    <span
                      className={`${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      ⏰ {task.time}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => dispatch(toggleComplete({ date, index }))}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => dispatch(deleteTask({ date, index }))}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayPlanner;
