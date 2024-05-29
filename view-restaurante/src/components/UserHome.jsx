import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({user}){
    if(user!=="user" || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');

    function goHome(){
        home("/");
    }

    async function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            fetch(`https://parcial3-rouge.vercel.app/v1/signos/${signo}`)
                .then(response => response.json())
                .then(responseData => setTextoSigno(responseData))
        }
    }

    return (
        <div className="container">
        </div>
    )
}

export default UserHome;