// export const uploadAvatar = (dispatch, getState, image) => {
//     const url = 'https://motion.propulsion-home.ch/backend/api/users/me/';
//     const token = localStorage.getItem("token"); 
  
//     const formData = new FormData()
//     formData.append('avatar', image)
    
//     console.log(formData)
//      const config = {
//       method: 'PATCH',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       body: formData,                      
//     };
//     fetch(url,config)
//     .then (response => response.json())
//     .then(data => {
//       console.log(data);
//     })
//   }