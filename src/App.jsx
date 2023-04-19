import Header from "./components/layout/Header";

import Pedidos from "./components/pedidos/Pedidos";
import NuevoPedido from "./components/pedidos/NuevoPedido";
import EditarPedido from "./components/pedidos/EditarPedido";

import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";

import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";

import Login from "./components/auth/Login";
import { CRMContext,CRMProvider} from "./context/CRMcontext";
import { useContext } from "react";



import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Registrarse from "./components/auth/Registrarse";

function App() {
  const [auth, setAuth] = useContext(CRMContext)


  return (
    <>
     
      <BrowserRouter>
      <CRMProvider value={[auth, setAuth]}>
        <Routes> 
       
            <Route path="/" element={<Header />}>
       
            <Route path="/clientes"  element={<Clientes />}/>
          
            <Route path="/cliente/clienteNuevo" element={<NuevoCliente/>}/>
            <Route path='/cliente/editarCliente/:id' element={<EditarCliente/>} />
          

            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/productoNuevo" element={<NuevoProducto />} />
            <Route path="/producto/editarProducto/:id" element={<EditarProducto />} />

            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/pedido/pedidoNuevo/:id" element={<NuevoPedido />} />
            <Route path="/pedido/editarPedido/:id" element={<EditarPedido />} />
            <Route path="/registrarse" element={<Registrarse/>} />
            <Route path="/iniciar-sesion" element={<Login />} />
          </Route>
        </Routes>
        </CRMProvider>  
      
      </BrowserRouter>
     
    </>

  )
}

export default App
