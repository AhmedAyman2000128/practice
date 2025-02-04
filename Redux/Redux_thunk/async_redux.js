const redux = require("redux");
const reduxThunk = require("redux-thunk").thunk;
//App
const initialState = {
  loading: false,
  users: [],
  error: "",
};

//Action Constants
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//Actions
function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST,
  };
}
function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users: users,
  };
}
function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    error: error,
  };
}

//Reducer
function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

//Action Creator
function fetchUsers() {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          dispatch(fetchUsersFailure("Bad http request"));
          throw new Error("Bad http request");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
}

const usersStore = redux.createStore(
  usersReducer,
  redux.applyMiddleware(reduxThunk)
);

usersStore.subscribe(() => console.log(usersStore.getState()));
usersStore.dispatch(fetchUsers());
