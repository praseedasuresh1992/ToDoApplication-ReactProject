import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mx-auto pb-12 px-4 sm:px-6 lg:px-12 bg-blue-200 text-justify text-gray-800 dark:text-gray-200">
      {/* Sticky Header with Home Link */}
      <div className=" bg-blue-300 dark:bg-blue-900 p-3 shadow-md">
        <Link
          to="/"
          className="text-green-900 dark:text-green-300 hover:text-green-700 dark:hover:text-green-400 text-lg sm:text-xl font-semibold underline"
        >
          ← Back to Login
        </Link>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl text-red-500 font-bold mb-10 text-center mt-6">
        About Goal Glow
      </h1>

      <p className="mb-9 sm:mx-6 lg:mx-12 text-base sm:text-lg md:text-xl leading-relaxed">
        Welcome to <span className="font-semibold">GoalGlow</span>, a simple yet
        powerful To-Do application designed to help both{" "}
        <strong>Individuals</strong> and <strong>Groups</strong> stay productive
        and organized.
      </p>

      {/* Individual Users Section */}
      <section className="mb-8 sm:mx-6 lg:mx-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          👤 For Individual Users
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base md:text-lg">
          <li>
            <strong>Login:</strong> Enter your <em>email</em> and{" "}
            <em>password</em> to access your personal task dashboard.
          </li>
          <li>
            <strong>Tasks:</strong> Add tasks with:
            <ul className="list-circle ml-6">
              <li>✅ Task Title & Description</li>
              <li>🗓️ Date & Time</li>
              <li>🔺 Priority (High, Medium, Low)</li>
            </ul>
          </li>
          <li>
            <strong>Manage:</strong> Edit, delete, or mark tasks as completed
            anytime.
          </li>
        </ul>
      </section>

      {/* Group Users Section */}
      <section className="mb-8 sm:mx-6 lg:mx-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          👥 For Group Users
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base md:text-lg">
          <li>
            <strong>Login:</strong> Groups log in using:
            <ul className="list-circle ml-6">
              <li>Common group <em>email</em></li>
              
              <li>A common group <em>password</em></li>
            </ul>
          </li>
          <li>
            <strong>Tasks:</strong> Assign tasks to specific members with:
            <ul className="list-circle ml-6">
              <li>📌 Task Title & Description</li>
              <li>👤 Assigned Member</li>
              <li>🗓️ Date & Time</li>
              <li>🔺 Priority (High, Medium, Low)</li>
            </ul>
          </li>
          <li>
            <strong>Collaboration:</strong> Keep track of each member’s tasks to
            ensure the whole team stays on schedule.
          </li>
        </ul>
      </section>

      {/* Why Choose Section */}
      <section className="sm:mx-6 lg:mx-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          ✨ Why Choose GoalGlow?
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base md:text-lg">
          <li>Simple and user-friendly interface</li>
          <li>
            Designed for <strong>both personal productivity</strong> and{" "}
            <strong>team collaboration</strong>
          </li>
          <li>Clear task priorities and reminders</li>
          <li>
            Flexibility to manage <em>individual goals</em> and{" "}
            <em>group projects</em> in one place
          </li>
        </ul>
      </section>
    </div>
  );
}

export default About;
