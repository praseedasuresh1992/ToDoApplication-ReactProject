import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addGroupTask,
  updateGroupTask,
  deleteGroupTask,
} from "../../redux/GroupTaskSlice";
import { useParams } from "react-router-dom";

function ManageGroupTask() {
  const { groupName } = useParams();
  const [formState, setFormState] = useState({});
  const [showFormFor, setShowFormFor] = useState(null);
  const [editTaskFor, setEditTaskFor] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const groupTasks = useSelector((state) => state.groupTasks);

  // ✅ handle input change for form
  const handleInputChange = (memberId) => (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [memberId]: { ...prev[memberId], [name]: value },
    }));
  };

  // ✅ save task (add or edit)
  const handleSaveTask = (member) => {
    const memberForm = formState[member.id] || {};
    const { date, text, time, priority } = memberForm;

    // validation
    if (!date || !text || !time || !priority) {
      alert("⚠️ Please fill all fields (including priority).");
      return;
    }

    if (editTaskFor && editTaskFor.memberId === member.id) {
      // update existing task
      dispatch(
        updateGroupTask({
          groupName,
          memberId: member.id,
          taskId: editTaskFor.task.id,
          updatedTask: { date, text, time, priority },
        })
      );
      setEditTaskFor(null);
    } else {
      // add new task
      dispatch(
        addGroupTask({
          groupName,
          memberId: member.id,
          memberName: member.name,
          date,
          text,
          time,
          priority,
        })
      );
    }

    setFormState((prev) => ({ ...prev, [member.id]: {} }));
    setShowFormFor(null);
  };

  // ✅ delete task
  const handleDeleteTask = (memberId, taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteGroupTask({ groupName, memberId, taskId }));
    }
  };

  // ✅ get tasks for member
  const getTasksForMember = (memberId) => {
    return groupTasks[groupName]?.members?.[memberId] || [];
  };

  return (
    <div className="min-h-screen bg-blue-200 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          📌 Manage Tasks for Group: {currentUser?.groupName}
        </h2>

        <ul className="space-y-6">
          {currentUser?.members?.length > 0 ? (
            currentUser.members.map((m) => (
              <li
                key={m.id}
                className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                {/* Member Info */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {m.name} <span className="text-sm">({m.email})</span>
                  </span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition"
                    onClick={() => {
                      setShowFormFor(m.id);
                      setEditTaskFor(null);
                      setFormState((prev) => ({ ...prev, [m.id]: {} }));
                    }}
                  >
                    ➕ Add Task
                  </button>
                </div>

                {/* Task List */}
                <div className="mt-4">
                  <h5 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    📋 Tasks:
                  </h5>
                  <ul className="space-y-2">
                    {getTasksForMember(m.id).length > 0 ? (
                      getTasksForMember(m.id).map((task) => (
                        <li
                          key={task.id}
                          className="flex justify-between items-center text-base text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 px-3 py-2 rounded-lg"
                        >
                          <span>
                            {task.text} on {task.date} at {task.time} —{" "}
                            <span
                              className={
                                task.priority === "High"
                                  ? "text-red-600 font-bold"
                                  : task.priority === "Medium"
                                  ? "text-yellow-600 font-semibold"
                                  : "text-green-600 font-medium"
                              }
                            >
                              {task.priority} Priority
                            </span>
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditTaskFor({ memberId: m.id, task });
                                setShowFormFor(m.id);
                                setFormState((prev) => ({
                                  ...prev,
                                  [m.id]: { ...task },
                                }));
                              }}
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(m.id, task.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              ❌
                            </button>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 dark:text-gray-400">
                        No tasks yet
                      </li>
                    )}
                  </ul>
                </div>

                {/* Task Form */}
                {showFormFor === m.id && (
                  <div className="mt-4 p-4 border rounded-lg bg-white dark:bg-gray-800 shadow">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                      {editTaskFor ? `Edit Task for ${m.name}` : `Add Task for ${m.name}`}
                    </h4>

                    <input
                      type="date"
                      name="date"
                      value={formState[m.id]?.date || ""}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={handleInputChange(m.id)}
                      className="border p-3 rounded-lg w-full mb-3 text-lg dark:bg-gray-700 dark:text-white"
                    />

                    <input
                      type="text"
                      name="text"
                      placeholder="Task description..."
                      value={formState[m.id]?.text || ""}
                      onChange={handleInputChange(m.id)}
                      className="border p-3 rounded-lg w-full mb-3 text-lg dark:bg-gray-700 dark:text-white"
                    />

                    <input
                      type="time"
                      name="time"
                      value={formState[m.id]?.time || ""}
                      onChange={handleInputChange(m.id)}
                      className="border p-3 rounded-lg w-full mb-3 text-lg dark:bg-gray-700 dark:text-white"
                    />

                    <select
                      name="priority"
                      value={formState[m.id]?.priority || ""}
                      onChange={handleInputChange(m.id)}
                      className="border p-3 rounded-lg w-full mb-4 text-lg dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Priority</option>
                      <option value="High">🔴 High</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="Low">🟢 Low</option>
                    </select>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleSaveTask(m)}
                        className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                      >
                        {editTaskFor ? "Update Task" : "Save Task"}
                      </button>
                      <button
                        onClick={() => {
                          setShowFormFor(null);
                          setEditTaskFor(null);
                        }}
                        className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-600 dark:text-gray-400 text-lg">
              No members yet
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ManageGroupTask;
