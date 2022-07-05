//Kat -- getting most users for the find friends page

export const fetchFriends = (dispatch, getState) => {
  const url = "https://motion.propulsion-home.ch/backend/api/users/?limit=25&offset=0";
  const method = "GET";
  //const latestReduxState = getState();
  const token = localStorage.getItem("token"); 
  const headers = new Headers({'Authorization':`Bearer ${token}`});
  const config = {method,headers};
  fetch(url,config)
  .then(response => response.json())
  .then(data => {
    dispatch({ type: "fetchFindFriends", payload: data.results })
    console.log(data.results)
    
  })
}