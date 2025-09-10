import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleGroupComplete, deleteGroupTask } from "../../redux/GroupTaskSlice";

function TaskList() {
  const { groupName } = useParams();
  const dispatch = useDispatch();

  const groupTasks = useSelector((state) => state.groupTasks);
  const groupData = groupTasks[groupName];
  const members = groupData?.members || {};

  const [filter, setFilter] = useState("all");

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  // ✅ Date helpers
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isSameDate = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const filterAndSortTasks = (tasks) => {
    let filtered = tasks;
    if (filter === "completed") filtered = tasks.filter((t) => t.completed);
    if (filter === "notCompleted") filtered = tasks.filter((t) => !t.completed);

    return [...filtered].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  return (
    <div className="min-h-screen bg-blue-200 p-4 sm:p-6 md:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Task List of {groupName}
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-lg ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg text-lg ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("notCompleted")}
          className={`px-4 py-2 rounded-lg text-lg ${
            filter === "notCompleted"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          Not Completed
        </button>
      </div>

      {Object.entries(members).length > 0 ? (
        Object.entries(members).map(([memberId, tasks]) => {
          const sortedTasks = filterAndSortTasks(tasks);

          return (
            <div key={memberId} className="mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                👤 {tasks[0]?.memberName || "Unknown Member"}
              </h3>

              {sortedTasks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow-md text-lg">
                    <thead className="bg-blue-400 text-white">
                      <tr>
                        <th className="px-4 py-2 text-left">Task</th>
                        <th className="px-4 py-2 text-left">Due Date</th>
                        <th className="px-4 py-2 text-left">Time</th>
                        <th className="px-4 py-2 text-left">Priority</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedTasks.map((task) => {
                        const taskDate = new Date(task.date);

                        // ✅ Row class logic
                        let rowClass = "bg-white"; // default
                        if (!task.completed) {
                          if (taskDate < new Date().setHours(0, 0, 0, 0)) {
                            rowClass = "bg-red-200"; // overdue
                          } else if (isSameDate(taskDate, tomorrow)) {
                            rowClass = "bg-yellow-200"; // due tomorrow
                          }
                        } else {
                          rowClass = "bg-green-100"; // ✅ completed
                        }

                        return (
                          <tr
                            key={task.id}
                            className={`${rowClass} border-b hover:bg-gray-100`}
                          >
                            <td className="px-4 py-2">{task.text}</td>
                            <td className="px-4 py-2">{task.date}</td>
                            <td className="px-4 py-2">{task.time}</td>
                            <td
                              className={`px-4 py-2 font-bold ${
                                task.priority === "High"
                                  ? "text-red-600"
                                  : task.priority === "Medium"
                                  ? "text-orange-500"
                                  : "text-green-600"
                              }`}
                            >
                              {task.priority}
                            </td>
                            <td className="px-4 py-2">
                              {task.completed
                                ? "✅ Completed"
                                : taskDate < new Date().setHours(0, 0, 0, 0)
                                ? "⚠️ Overdue"
                                : isSameDate(taskDate, tomorrow)
                                ? "⏳ Due Tomorrow"
                                : "❌ Not Completed"}
                            </td>
                            <td className="px-4 py-2 flex flex-col sm:flex-row gap-2">
                              <button
                                onClick={() =>
                                  dispatch(
                                    toggleGroupComplete({
                                      groupName,
                                      memberId: task.memberId,
                                      taskId: task.id,
                                    })
                                  )
                                }
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm sm:text-base"
                              >
                                Toggle
                              </button>
                              <button
                                onClick={() =>
                                  dispatch(
                                    deleteGroupTask({
                                      groupName,
                                      memberId: task.memberId,
                                      taskId: task.id,
                                    })
                                  )
                                }
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm sm:text-base"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-lg text-gray-700 mt-2">
                  No tasks found for this member
                </p>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-lg text-gray-700 text-center">
          No members or tasks found for this group.
        </p>
      )}
    </div>
  );
}

export default TaskList;
