const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    console.log("increment");
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    console.log("decrement");
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = redux.createStore(counterReducer);

console.log(store.getState());
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// will be trigger when dispatch action
store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
