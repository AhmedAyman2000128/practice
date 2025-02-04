const redux = require("redux");
const redux_logger = require("redux-logger");

const logger = redux_logger.createLogger();
//cakes ==> noOfCakes
//iceCream ==> noOfIcecreams
const initialCakeState = {
  noOfCakes: 10,
};
const initialIceCreamState = {
  noOfIceCreams: 20,
};
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
function buyCakes() {
  return {
    type: BUY_CAKE,
    payment: "cash",
  };
}
function buyIceCreams() {
  return {
    type: BUY_ICECREAM,
    payment: "cash",
  };
}
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        noOfIceCreams: state.noOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const combineReducers = redux.combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const rootStore = redux.createStore(
  combineReducers,
  redux.applyMiddleware(logger)
);
console.log(rootStore.getState());
rootStore.subscribe(() => {});
rootStore.dispatch(buyCakes());
rootStore.dispatch(buyIceCreams());
//listener in the subscribe is always called after the dispatch is called (even if the state isnot changed)
//action is passed to all the reducers in the store so be sure to put default in the switch case inside each reducer to return the state as it is
//apply middleware --> 1-library redux-logger
//                      2-createLogger
//                      3-redux.applyMiddleWare(logger) ==> inside createStore(combineReducer,...)
