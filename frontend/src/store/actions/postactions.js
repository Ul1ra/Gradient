//Kat -- getting most recent posts for the feed page

export const fetchAndDispatchPosts = (dispatch, getState) => {
  const url = "https://motion.propulsion-home.ch/backend/api/social/posts/";
  const method = "GET";
  //const latestReduxState = getState();
  const token = localStorage.getItem("token"); 
  const headers = new Headers({'Authorization':`Bearer ${token}`});
  const config = {method,headers};
  fetch(url,config)
  .then(response => response.json())
  .then(data => {
    dispatch({ type: "setPosts", payload: data.results })
    console.log(data.results);
  })
}

//Kat -- posting a post (Both text and image work now)

export const dispatchPost = (dispatch, getState, content, images) => {
  const url = 'https://motion.propulsion-home.ch/backend/api/social/posts/';
  const token = localStorage.getItem("token"); 
 
  console.log('images 1------,', images[0]);

  const formData = new FormData()
  formData.append('content', content)
  formData.append('images', images[0])
  
  console.log(formData)
   const config = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,                      
  };
  fetch(url,config)
  .then (response => response.json())
  .then(data => {
    // dispatch({ type: "newPost", payload: data })
    console.log(data);
  })
}


export const dispatchLiked = (dispatch, getState, likedid, likedcontent) => {
  const url = "https://motion.propulsion-home.ch/backend/api/social/posts/toggle-like/" + likedid + "/";
  
  console.log(url)
  const token = localStorage.getItem("token"); 
 
  const content = { content: likedcontent }
    const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
      body: JSON.stringify(content)                
  };
  fetch(url,config)
  .then (response => response.json())
  .then(data => {
    dispatch({ type: "newLike", payload: data.id })

  })
}

