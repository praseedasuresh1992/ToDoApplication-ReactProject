import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleComplete, deleteTask } from "../redux/taskSlice";

function DayPlanner() {
  const [selectedDate, setSelectedDate] = useState("");
  const [taskText, setTaskText] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const tasksByDate = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="w-full md:w-auto mb-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition text-lg font-medium"
        >
          ← Back
        </button>

        {/* Date Selector */}
        <div className="mb-6">
          <label className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]} // Disallow past dates
            onChange={(e) => setSelectedDate(e.target.value)}
            className="ml-2 border p-2 rounded-lg text-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Add Task Section */}
        {selectedDate && (
          <div className="mb-6 space-y-3">
            <input
              type="text"
              placeholder="Enter task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="border p-3 rounded-lg w-full text-lg dark:bg-gray-700 dark:text-white"
            />
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="border p-3 rounded-lg w-full text-lg dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full text-lg font-medium hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        )}

        {/* Show Tasks by Date */}
        <div className="space-y-6">
          {Object.keys(tasksByDate).map((date) => (
            <div
              key={date}
              className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                📌 {date}
              </h3>
              <ul className="space-y-3">
                {tasksByDate[date].map((task, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 border-b last:border-b-0"
                  >
                    <div className="text-lg">
                      <span
                        className={`${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {task.text}
                      </span>
                      <span className="ml-2 text-base text-gray-600 dark:text-gray-300">
                        ⏰ {task.time}
                      </span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() =>
                          dispatch(toggleComplete({ date, index }))
                        }
                        className="flex-1 sm:flex-none bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 text-base"
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                      <button
                        onClick={() => dispatch(deleteTask({ date, index }))}
                        className="flex-1 sm:flex-none bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 text-base"
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
    </div>
  );
}

export default DayPlanner;
