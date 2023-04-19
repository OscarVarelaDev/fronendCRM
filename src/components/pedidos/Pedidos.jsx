import {useState, useEffect,useContext} from 'react'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMcontext'

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const [auth, setAuth] = useContext(CRMContext)

  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get('/pedidos/mostrarPedidos',{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
    
      setPedidos(resultado.data)
    }
    consultarAPI()
  }, [])


  
  return (
    <>
      <main className="caja-contenido col-9">
            <h2>Pedidos</h2>
            <ul className="listado-pedidos">
              
           {
              pedidos.map((pedido,index) => {
                return (
                  <li key={index} className="pedido">
                    <div className="info-pedido">
                      <p className="id">ID: {pedido._id}</p>
                      <p className="nombre">Cliente: {pedido.cliente.nombre + pedido.cliente.apellido}</p>
                
                      <p className="total">Total: {pedido.total}</p>
                     
                     </div>
                     </li>

                
                  )
              }
              ) }
      
            </ul>
        </main>
    
    </>
  )
}

export default Pedidos