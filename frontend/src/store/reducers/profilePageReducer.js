
const initialState = {
    token: undefined,
    name: undefined,
    userData: {
        things_user_likes: []
    },
    avatar: undefined
}


export const profilePageReducer = (state = initialState, action) => {
    if(action.type === 'setToken'){
        const newState = {...state};
        newState.token = action.payload
        return newState;
    } else if(action.type === 'saveUserData'){
        console.log('saving user data')
        const newState = {...state};
        newState.userData = action.payload
        return newState;
    }  else if(action.type === 'setNewAvatar'){
        const newState = {...state};
        newState.userData.avatar = action.payload
        return newState;
    } else if(action.type === 'updateUserData'){
        const newState = {...state};
        action.payload.forEach((element) => {
            newState.userData[element[0]] = element[1]
        })
        return newState;
    } else {
        return state;
    }
    
}