import { useEffect, useState,useContext} from 'react'
import clienteAxios from '../../config/axios'
import Producto from './Producto'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { CRMContext } from '../../context/CRMcontext'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [auth, setAuth] = useContext(CRMContext)
  const obtenerProductos = async () => {

    const productosConsulta = await clienteAxios.get('/productos',{
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
      setProductos(productosConsulta.data)

  }
  useEffect(() => {
    if(!auth.token) return
     obtenerProductos()
  }, [productos])

  if(!productos.length) return <Spinner/>

  return (
    <main className="caja-contenido col-9">
    <h2>Productos</h2>

    <Link to={"/producto/productoNuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Producto
    </Link>
    <ul className="listado-productos">
       <Producto productos={productos}/>
    </ul>
    </main>
  )
}

export default Productos