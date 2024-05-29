import './styles/Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const goTo = useNavigate();

    const validateUser = (event)=>{
        event.preventDefault();
        setLoading(true);

        fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/login`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username, "password": password})
        })
        .then(response => {
            setLoading(false);
            return response.json();
        })
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                callback(data);
                goTo("/Home");
                console.log("Inicio de sesión exitoso");
            }
        });
    }
    return (
        <form onSubmit={validateUser}>
            <div className="state-login">
                <div className="state-login__left col-7">
                    <h2>RESTAURANT HOME DELIGHTS</h2>
                    <h2>Iniciar sesión</h2>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Usuario</label>
                        <input className="form-control" type="text" aria-label="Ingresar usuario" onChange={(e)=> setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" id="inputPassword" className="form-control" onChange={(e)=> setPassword(e.target.value)} />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="d-grid gap-2">
                        <button className="btn btn-primary-white" type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Iniciar sesión'}
                        </button>
                    </div>
                </div>
                <div className="state-login__right col-5"></div>
            </div>
        </form>
    )
}

export default Login;