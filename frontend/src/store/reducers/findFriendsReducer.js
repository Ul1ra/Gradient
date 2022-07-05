//Kat -- reducer to save fetched friends to the redux state

const initialFriendsState = {
  users: []
}

export const findFriendsReducer = (state=initialFriendsState,action) => {
  if (action.type === "fetchFindFriends") {
    const newState = { ...state };
    //const newFriends = action.payload;
    newState.users = action.payload;
    console.log(newState);
    return newState;
  } else {
    return state;
  }
  }
