import { createStore } from "redux";
import { creatsSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = creatsSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

// merge multiple to the one reducer
// const store = configureStore({
//   reducer: {counter: counterSlice.reducer}
// });

// creat actions automatically
export const counterActions = counterSlice.actions;

export default store;
