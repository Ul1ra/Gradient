//Kat - temporary for testing purposes

import { useEffect } from "react"
import {useNavigate} from "react-router-dom"


//Higher Order Component (function ==> component)
const withAuth = Page => {

    return (props) => {
      useEffect(() => {
        const token = localStorage.getItem("token");
            // if(!token){
            //   useNavigate("/");
            // }
        },[])

        return <Page {...props}/>
    }
}

export default withAuth;

