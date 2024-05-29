import { useEffect, useState } from 'react';

function HomeAdminUsers(){
    const [users, setUsers] = useState([]);
    async function getUsers() {
        try {
            const response = await fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/users`);
            const responseData = await response.json();
            setUsers(responseData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rol, setRol] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const createUser = (event)=>{
        event.preventDefault();
        setLoading(true);

        fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/user`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"id": 1, "user": username, "password": password, "role": rol, "activate": true})
        })
        .then(response => {
            setLoading(false);
            return response.json();
        })
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                setUsers([...users, data]);
                setUsername('');
                setPassword('');
                setRol('');
                console.log("se creo correctamente el usuario");
            }
        });
    }

    const deleteUser = async (user) => {
        try {
            const response = await fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/user?user=${user}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.ok) {
                const updatedUsers = users.filter(u => u.user !== user);
                setUsers(updatedUsers);
                console.log("Usuario eliminado correctamente");
            } else {
                console.error('Error al eliminar usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error.message);
        }
    };

    const [isEdit, setIsEdit] = useState(false);
    const showEditUser = (user) => {
        setIsEdit(true);
        setUsername(user.user);
        setPassword(user.password);
        setRol(user.role);
    };

    const editUser = (event) => {
        event.preventDefault();
        setLoading(true);

        fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/user`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "user": username, "password": password, "role": rol, "activate": true})
        })
        .then(response => {
            setLoading(false);
            return response.json();
        })
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                const updatedUsers = users.map(u => u.user === data.user ? data : u);
                console.log("updatedUsers", data);
                setUsers(updatedUsers);
                setUsername('');
                setPassword('');
                setRol('');
                setIsEdit(false);
                console.log("se edito correctamente el usuario");
            }
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="homeAdminUsers p-2">
            <h2>Usuarios</h2>
            <form onSubmit={isEdit ? editUser : createUser}>
                <div className='d-flex'>
                    <div className='col-3 me-2'>
                        <div className="mb-3">
                            <label htmlFor="user" className="form-label">Usuario</label>
                            <input className="form-control" type="text" aria-label="Ingresar usuario" value={username || ''} onChange={(e)=> setUsername(e.target.value)} disabled={isEdit} />
                        </div>
                    </div>
                    <div className='col-3 me-2'>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" id="inputPassword" className="form-control" value={password || ''} onChange={(e)=> setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='col-3 me-2'>
                        <div className="mb-3">
                            <label htmlFor="rol" className="form-label">Rol</label>
                            <select className="form-select" aria-label="Seleccione un rol" value={rol || ''} onChange={(e)=> setRol(e.target.value)}>
                                <option defaultValue>Seleccione un rol</option>
                                <option value="admin">Administrador</option>
                                <option value="mesero">Mesero</option>
                                <option value="cocina">Cocina</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-3 homeAdmin__action'>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">&nbsp;</label><br />
                            <button className="btn btn-primary-white" type="submit" disabled={loading}>
                                {loading ? 'Guardando...' : isEdit ? 'Editar' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table">
                <thead>
                    <tr>
                        <th width="50%">Usuario</th>
                        <th width="30%">Rol</th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.user}</td>
                            <td>{user.role}</td>
                            <td>
                                <div className="d-flex">
                                    <div className="mx-2"><button type="button" className="btn btn-secondary btn-secondary-violet" onClick={() => showEditUser(user)}>Editar</button></div>
                                    <div className="mx-2"><button type="button" className="btn btn-danger" onClick={() => deleteUser(user.user)}>Eliminar</button></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HomeAdminUsers;