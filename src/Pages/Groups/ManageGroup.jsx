import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateGroupName } from "../../redux/slice";
 import {  deleteMember } from "../../redux/slice";


function ManageGroup() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  const [newName, setNewName] = useState("");
  const [newRepName, setNewRepName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", email: "" });

  useEffect(() => {
    if (currentUser) {
      setNewName(currentUser.groupName || "");
      setNewRepName(currentUser.groupRepName || "");
      setNewEmail(currentUser.groupEmail || "");
      setNewPassword(currentUser.groupPassword || "");
      setMembers(currentUser.members?.map((m) => ({ ...m })) || []);
    }
  }, [currentUser]);

  // ✅ Delete member

const handleDeleteMember = (id, name) => {
  if (!window.confirm(`Remove ${name || "this member"}?`)) return;
  setMembers((prev) => prev.filter((m) => m.id !== id)); // update UI immediately
  dispatch(deleteMember({ groupId: currentUser.id, memberId: id })); // update redux + storage
};

  // ✅ Add new member (with validation)
  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) {
      alert("Please enter both name and email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newMember.email)) {
      alert("Enter a valid email.");
      return;
    }
    setMembers((prev) => [...prev, { id: Date.now(), ...newMember }]);
    setNewMember({ name: "", email: "" });
  };

  // ✅ Save group with validation
  const handleSave = () => {
    if (!newName.trim()) {
      alert("Group name is required.");
      return;
    }
    if (!newRepName.trim()) {
      alert("Representative name is required.");
      return;
    }
    if (!newEmail.trim() || !/\S+@\S+\.\S+/.test(newEmail)) {
      alert("Valid group email is required.");
      return;
    }
    if (!newPassword.trim() || newPassword.length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }

    dispatch(
      updateGroupName({
        id: currentUser.id,
        newName,
        newRepName,
        newEmail,
        newPassword,
        newMembers: members,
      })
    );

    alert("Group successfully updated!");
  };

  return (
    <div className="min-h-screen bg-blue-200 p-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Editing Group: {currentUser?.groupName}
        </h2>

        {/* Group Details */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter new group name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 rounded border text-lg"
            required
          />
          <input
            type="text"
            placeholder="Enter new group Representative"
            value={newRepName}
            onChange={(e) => setNewRepName(e.target.value)}
            className="w-full p-3 rounded border text-lg"
            required
          />
          <input
            type="email"
            placeholder="Enter new group email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-3 rounded border text-lg"
            required
          />
          <input
            type="password"
            placeholder="Enter new group password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded border text-lg"
            required
          />
        </div>

        {/* Members */}
        <div>
          <h4 className="text-xl font-semibold mb-2">
            Group Members ({members.length}):
          </h4>
          <ul className="space-y-3">
            {members.length > 0 ? (
              members.map((m) => (
                <li
                  key={m.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
                >
                  <input
                    type="text"
                    value={m.name}
                    readOnly
                    className="flex-1 p-2 border rounded text-lg w-full sm:w-auto bg-gray-100 cursor-not-allowed"
                  />
                  <input
                    type="email"
                    value={m.email}
                    readOnly
                    className="flex-1 p-2 border rounded text-lg w-full sm:w-auto bg-gray-100 cursor-not-allowed"
                  />
                  <button
                    onClick={() => handleDeleteMember(m.id, m.name)}
                    className="bg-red-500 text-white px-3 py-2 rounded mt-2 sm:mt-0"
                  >
                    ❌ Delete
                  </button>
                </li>
              ))
            ) : (
              <li>No members yet</li>
            )}
          </ul>
        </div>

        {/* Add New Member */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Add New Member</h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Member name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember((prev) => ({ ...prev, name: e.target.value }))
              }
              className="flex-1 p-2 border rounded text-lg"
            />
            <input
              type="email"
              placeholder="Member email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember((prev) => ({ ...prev, email: e.target.value }))
              }
              className="flex-1 p-2 border rounded text-lg"
            />
            <button
              onClick={handleAddMember}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              ➕ Add
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageGroup;
