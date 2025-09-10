import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback } from "../redux/FeedbackSlice";
import { useNavigate } from "react-router-dom";

function RatingAndReview() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.feedback.reviews);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please give at least 1 star!");
      return;
    }

    dispatch(addFeedback({ rating, review }));
    alert("✅ Thank you for your feedback!");

    setRating(0);
    setReview("");
  };

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "No ratings yet";

  return (
    <div className="p-6 rounded-lg h-screen shadow-lg bg-blue-100 dark:bg-gray-800 transition-colors duration-300 space-y-4">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        ⭐ Rate Our App
      </h3>

      {/* ⭐ Star Rating */}
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-3xl transition ${
              star <= rating ? "text-yellow-400" : "text-gray-400 dark:text-gray-500"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* 📝 Review */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review (optional)..."
        className="w-full border rounded p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Back
        </button>
      </div>

      {/* Average */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Average Rating: {avgRating} ⭐
      </p>

      {/* Reviews */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">
          User Reviews
        </h4>
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div
              key={r.id}
              className="border-b border-gray-200 dark:border-gray-700 py-2"
            >
              <p className="text-gray-700 dark:text-gray-300">
                ⭐ {r.rating} – {r.review || "No review"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default RatingAndReview;
