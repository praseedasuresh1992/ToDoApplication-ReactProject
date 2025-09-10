import { createSlice } from "@reduxjs/toolkit";

const savedFeedback = JSON.parse(localStorage.getItem("feedback")) || [];

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    reviews: savedFeedback, // list of {id, rating, review}
  },
  reducers: {
    addFeedback: (state, action) => {
      const { rating, review } = action.payload;
      const newFeedback = {
        id: Date.now(),
        rating,
        review,
      };
      state.reviews.push(newFeedback);

      // persist to localStorage
      localStorage.setItem("feedback", JSON.stringify(state.reviews));
    },
  },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
