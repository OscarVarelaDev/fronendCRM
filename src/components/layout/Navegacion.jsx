import { Link } from "react-router-dom"
import { Outlet } from 'react-router-dom'
import { useContext } from "react"
import { CRMContext } from "../../context/CRMcontext"

const Navegacion = () => {

    const [auth, setAuth] = useContext(CRMContext)

      
    

    return (

        <>
        <div className="grid contenedor contenido-principal">
            <aside className="sidebar col-3">
                <h2>Administración</h2>

                <nav className="navegacion">
                    {auth.auth ? (
                        <>
                            <Link to={"/clientes"} className="clientes">Clientes</Link>
                            <Link to={"/productos"} className="productos">Productos</Link>
                            <Link to={"/pedidos"} className="pedidos">Pedidos</Link>
                        </>
                    ) : <>
                        <Link to={"/iniciar-sesion"} className="clientes">Iniciar Sesión</Link>
                        <Link to={"/registrarse"} className="productos">Registrarse</Link>
                    </>}

                  
                </nav>
            </aside>
            <main className="caja-contenido col-9">
                
            <Outlet />
                </main>

        </div>
        </>
    )
}

export default Navegacion