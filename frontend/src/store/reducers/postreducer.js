//Kat -- reducer to save fetched posts to the redux state

const initialPostsState = {
  posts: []
}

export const currentPosts = (state=initialPostsState,action) => {
  if (action.type === "setPosts") {
    if (state.posts === action.payload) {
      return state;
    }
    else {
      const newState = { ...state };
      const newPosts = action.payload;
      newState.posts = newPosts;
      //console.log(newState);
      return newState;
      
    }
  }
  else if (action.type === "newLike") {
    const newState = { ...state };
    const idLiked = action.payload;
    newState.posts.forEach((element, index) => {
      if (element.id === idLiked) {
        newState.posts[index].logged_in_user_liked = !state.posts[index].logged_in_user_liked;
      }
    }); console.log(state)
  return newState;
  }
  else return state;
}
