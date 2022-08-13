//Kat -- Temporary login to save token in localestorage for testing purposes

export const fetchAndDispatchToken = (dispatch, getState, email, password, navigate) => {
  const url = 'http://127.0.0.1:8000/backend/api/auth/token/';
  // const url = "https://gradient.propulsion-home.ch/backend/api/auth/token/";
  const method = "POST";
  const headers = new Headers({'Content-type':'application/json'});
  let body = {email,password};
  body = JSON.stringify(body);    
  const config = {method,headers,body}
  fetch(url,config)
  .then(response => response.json())
  .then(data => {
    if(data.access){
      dispatch({ type: "storeUserDetails", payload: data });localStorage.setItem("token", data.access);
      navigate("/feed/");
      console.log(data);

  }
})
}
