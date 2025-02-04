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
    payload: users,
  };
}
function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
}
//reducer
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
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
//Action creator
function fetchUsers() {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          dispatch(fetchUsersFailure("Error in server"));
          throw new Error("Error in server cannot fetch data");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchUsersSuccess(data.map((user) => user.id)));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
}
//Store
const usersStore = redux.createStore(
  usersReducer,
  redux.applyMiddleware(reduxThunk)
);
usersStore.subscribe(() => console.log(usersStore.getState()));
usersStore.dispatch(fetchUsers());
