const initialState = {
  user: {
    avatar: '',
    first_name: '',
    last_name: '',
  }
}

export const userReducer =
  (state = initialState, action) => {
    if (action.type === "storeUserDetails") {
      const newState = { ...state };
      const newUser = action.payload;
      newState.user.avatar = newUser.user.avatar;
      newState.user.first_name = newUser.user.first_name;
      newState.user.last_name = newUser.user.last_name;
      console.log(newState);
      return newState;
      
    }
    console.log(state);
    return state;
  
}




