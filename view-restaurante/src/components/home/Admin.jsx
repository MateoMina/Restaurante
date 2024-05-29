import AdminUsers from './Admin/Users'
import AdminProducts from './Admin/Products'
import AdminSales from './Admin/Sales'

function homeAdmin(){
    return (
        <div className="homeAdmin">
            <div className='d-flex'>
                <div className='col-7'>
                    <AdminUsers />
                </div>
            </div>
            <div className='d-flex'>
            <div className='col-5'>
                    <AdminProducts />
                </div>
            </div>
            <AdminSales />

        </div>
    )
}

export default homeAdmin;