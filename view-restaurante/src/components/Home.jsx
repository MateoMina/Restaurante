import { useNavigate } from "react-router-dom";

import './styles/home.css'

import HomeAdmin from './home/Admin'
import HomeCocina from './home/Cocina'
import HomeMesero from './home/Mesero'

function Home({user}){
    const home = useNavigate();

    function goHome(){
        home("/");
    }

    return (
        <div className="home">
            <div className='home__toolbar row'>
                <div className='col d-flex gap-3 align-items-center'>
                    <div className='home__toolbar_picture'></div>
                    <div>RESTAURANT HOME DELIGHTS</div>
                </div>
                <div className='col d-flex justify-content-end align-items-center'>
                    <button type="button" className="btn btn-link" onClick={goHome}>Salir</button>
                </div>
            </div>
            <div className='home__content'>
                {user.role === 'admin' && <HomeAdmin />}
                {user.role === 'cocina' && <HomeCocina />}
                {user.role === 'mesero' && <HomeMesero userName={user.user} />}
            </div>
        </div>
    )
}

export default Home;